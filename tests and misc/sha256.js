  /** @fileOverview Javascript SHA-256 implementation.
  2  *
  3  * An older version of this implementation is available in the public
  4  * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
  5  * Stanford University 2008-2010 and BSD-licensed for liability
  6  * reasons.
  7  *
  8  * Special thanks to Aldo Cortesi for pointing out several bugs in
  9  * this code.
 10  *
 11  * @author Emily Stark
 12  * @author Mike Hamburg
 13  * @author Dan Boneh
 14  */
  
  /**
 17  * Context for a SHA-256 operation in progress.
 18  * @constructor
 19  * @class Secure Hash Algorithm, 256 bits.
 20  */
var sha256 = function (hash) {
     if (!this._key[0]) { this._precompute(); }
    if (hash) {
      this._h = hash._h.slice(0);
      this._buffer = hash._buffer.slice(0);
      this._length = hash._length;
    } else {
      this.reset();
    }
  };
  
 /**
 33  * Hash a string or an array of words.
 34  * @static
 35  * @param {bitArray|String} data the data to hash.
 36  * @return {bitArray} The hash value, an array of 16 big-endian words.
 37  */
 sha256.hash = function (data) {

 return (new sjcl.hash.sha256()).update(data).finalize();
  };
  
  sha256.prototype = {

    /**
 44    * The hash's block size, in bits.
 45    * @constant
 46    */
    blockSize: 512,
     
    /**
 50    * Reset the hash state.
 51    * @return this
 52    */
    reset:function () {
      this._h = this._init.slice(0);
      this._buffer = [];
      this._length = 0;
      return this;
    },
    
    /**
 61    * Input several words to the hash.
 62    * @param {bitArray|String} data the data to hash.
 63    * @return this
 64    */
    update: function (data) {
      if (typeof data === "string") {
        data = sjcl.codec.utf8String.toBits(data);
      }
      var i, b = this._buffer = sjcl.bitArray.concat(this._buffer, data),
          ol = this._length,
          nl = this._length = ol + sjcl.bitArray.bitLength(data);
      for (i = 512+ol & -512; i <= nl; i+= 512) {
        this._block(b.splice(0,16));
      }
      return this;
    },
    
    /**
 79    * Complete hashing and output the hash value.
 80    * @return {bitArray} The hash value, an array of 8 big-endian words.
 81    */
    finalize:function () {
      var i, b = this._buffer, h = this._h;
 
      // Round out and push the buffer
      b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1,1)]);
      
      // Round out the buffer to a multiple of 16 words, less the 2 length words.
      for (i = b.length + 2; i & 15; i++) {
        b.push(0);
      }
      
      // append the length
      b.push(Math.floor(this._length / 0x100000000));
      b.push(this._length | 0);
  
      while (b.length) {
        this._block(b.splice(0,16));
      }
 
     this.reset();
     return h;
   },
 
   /**
106    * The SHA-256 initialization vector, to be precomputed.
107    * @private
108    */
   _init:[],
   /*
111   _init:[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],
112   */
   
   /**
115    * The SHA-256 hash key, to be precomputed.
116    * @private
117    */
   _key:[],
   /*
120   _key:
121     [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
122      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
123      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
124      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
125      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
126      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
127      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
128      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2],
129   */
 
 
   /**
133    * Function to precompute _init and _key.
134    * @private
135    */
   _precompute: function () {
     var i = 0, prime = 2, factor;
 
     function frac(x) { return (x-Math.floor(x)) * 0x100000000 | 0; }
 
     outer: for (; i<64; prime++) {
       for (factor=2; factor*factor <= prime; factor++) {
         if (prime % factor === 0) {
           // not a prime
           continue outer;
         }
       }
       
       if (i<8) {
         this._init[i] = frac(Math.pow(prime, 1/2));
       }
       this._key[i] = frac(Math.pow(prime, 1/3));
       i++;
     }
   },
   
   /**
158    * Perform one cycle of SHA-256.
159    * @param {bitArray} words one block of words.
160    * @private
161    */
   _block:function (words) {  
     var i, tmp, a, b,
       w = words.slice(0),
       h = this._h,
       k = this._key,
       h0 = h[0], h1 = h[1], h2 = h[2], h3 = h[3],
       h4 = h[4], h5 = h[5], h6 = h[6], h7 = h[7];
 
     /* Rationale for placement of |0 :
171      * If a value can overflow is original 32 bits by a factor of more than a few
172      * million (2^23 ish), there is a possibility that it might overflow the
173      * 53-bit mantissa and lose precision.
174      *
175      * To avoid this, we clamp back to 32 bits by |'ing with 0 on any value that
176      * propagates around the loop, and on the hash state h[].  I don't believe
177      * that the clamps on h4 and on h0 are strictly necessary, but it's close
178      * (for h4 anyway), and better safe than sorry.
179      *
180      * The clamps on h[] are necessary for the output to be correct even in the
181      * common case and for short inputs.
182      */
     for (i=0; i<64; i++) {
       // load up the input word for this round
       if (i<16) {
         tmp = w[i];
       } else {
         a   = w[(i+1 ) & 15];
         b   = w[(i+14) & 15];
         tmp = w[i&15] = ((a>>>7  ^ a>>>18 ^ a>>>3  ^ a<<25 ^ a<<14) + 
                          (b>>>17 ^ b>>>19 ^ b>>>10 ^ b<<15 ^ b<<13) +
                          w[i&15] + w[(i+9) & 15]) | 0;
       }
       
       tmp = (tmp + h7 + (h4>>>6 ^ h4>>>11 ^ h4>>>25 ^ h4<<26 ^ h4<<21 ^ h4<<7) +  (h6 ^ h4&(h5^h6)) + k[i]); // | 0;
       
       // shift register
       h7 = h6; h6 = h5; h5 = h4;
       h4 = h3 + tmp | 0;
       h3 = h2; h2 = h1; h1 = h0;
 
       h0 = (tmp +  ((h1&h2) ^ (h3&(h1^h2))) + (h1>>>2 ^ h1>>>13 ^ h1>>>22 ^ h1<<30 ^ h1<<19 ^ h1<<10)) | 0;
     }
 
     h[0] = h[0]+h0 | 0;
     h[1] = h[1]+h1 | 0;
     h[2] = h[2]+h2 | 0;
     h[3] = h[3]+h3 | 0;
     h[4] = h[4]+h4 | 0;
     h[5] = h[5]+h5 | 0;
     h[6] = h[6]+h6 | 0;
     h[7] = h[7]+h7 | 0;
   }
};