/***************************************************************************/
/*                                                                         */
/*  Provided by Bilik-±ÿ¡¶ø∆                                                */
/*  URL: www.bilik.cn , Email: bilik@126.com                               */
/*  Download from: http://bbs.bilik.cn                                     */
/*                                                                         */
/*  edit.js                                                                */
/*                                                                         */
/*  Uyghur Unicode Input System -- edit file.                              */
/*                                                                         */
/*  Copyleft  2004-2006 by Muhammad Abdulla (muhammad@yulghun.com)         */
/*                                                                         */
/*  Anyone is share to use and distribute this piece of software, provided  */
/*  that this copyright notice is retained. The author is not responsible  */
/*  for any damage caused by the usage of this software.                   */
/*                                                                         */
/*  Uyghurcha:                                                             */
/*  Bu programmini harkim mushu nashir hoquqi sozini saqlap qalghan halda  */
/*  ishlatsa wa tarqatsa bolidu. Bu programmini tuzguchi ishlitishtin      */
/*  kilip chiqqan ziyangha masul bolmaydu.                                 */
/*  Pikirliringiz bolsa muhammad@yulghun.com digan addrisqa hat awating.   */
/***************************************************************************/

var imode = 0 ; // input mode, default is Uyghur

var qmode = 0 ; // quote mode, 0 for opening, 1 for closing

var keymap = new Array ( 128 ) ;
var charmap = new Array ( 256 ) ;

var PRIMe = 233; // 'e 
var PRIME = 201; // 'E 
var COLo  = 246; // :o 
var COLO  = 214; // :O 
var COLu  = 252; // :u 
var COLU  = 220; // :U 
var HAMZA = 0x0626 ;
var CHEE  = 0x0686 ;
var GHEE  = 0x063A ;
var NGEE  = 0x06AD ;
var SHEE  = 0x0634 ;
var SZEE  = 0x0698 ;

// right and left quotes in Uyghur
var OQUOTE = 0x00AB ; // for opening quote (oh quote)
var CQUOTE = 0x00BB ; // for closing quote 

var RCQUOTE = 0x2019 ; // 0x2019 is right closed curly quote

var BPAD = 0x0600 ;

// returns a char code for a given character
function gac ( ascii )
{
    var str = "" + ascii ;
    return str.charCodeAt(0) ;
}

var i ;
var inited = 0 ;

var ua = navigator.userAgent.toLowerCase();
var isIE = ((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1)) ;
var isGecko = (ua.indexOf("gecko") != -1 && ua.indexOf("safari") == -1) ;
var isMaxthon = ((ua.indexOf("msie") != -1) && (ua.indexOf("maxthon") != -1)) ;

// for pasting from Al-Katip text
var uyghur_keys = new Array ( "q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","/","D","F","G","H","J","K","?" ) ;
// Al Katip keymap
var ak_keymap = new Array (   45 ,36 ,38 ,49 ,42 ,74 ,48 ,43 ,72 ,53 ,71 ,51 ,47 ,39 ,41 ,57 ,66 ,67 ,68 ,50 ,52 ,58 ,73 ,40 ,70 ,69 ,56 ,34 ,65 ,54 ,46 ,44 ,35 ,31 ) ; 
// Ilikyurt keymap
var iy_keymap = new Array ( 63, 112, 55, 65, 90, 84, 70, 35, 103, 107, 43, 113, 81, 76, 69, 100, 93, 88, 120, 40, 38, 67, 73, 109, 48, 110, 96, 111, 125, 51, 68, 116, 114, 58 ) ; 

var akmap = new Array ( 256 ) ;
var iymap = new Array ( 256 ) ;

function init ( ) {
  if ( inited ) {
     return ;
  }

  inited = 1 ;

  // zero-out all entries first
  for ( i = 0 ; i < keymap.length ; i++ ) {
     keymap[i] = 0 ;
  }

  // Uyghur Unicode character map
  keymap [ gac ( 'A' ) ] = 0x06BE ;
  keymap [ gac ( 'a' ) ] = 0x06BE ;
  keymap [ gac ( 'B' ) ] = 0x0628 ;
  keymap [ gac ( 'b' ) ] = 0x0628 ;
  keymap [ gac ( 'C' ) ] = 0x063A ;
  keymap [ gac ( 'c' ) ] = 0x063A ;
  keymap [ gac ( 'D' ) ] = 0x0698 ;
  keymap [ gac ( 'd' ) ] = 0x062F ;
  keymap [ gac ( 'E' ) ] = 0x06D0 ;
  keymap [ gac ( 'e' ) ] = 0x06D0 ;
  keymap [ gac ( 'f' ) ] = 0x0627 ;
  keymap [ gac ( 'F' ) ] = 0x0641 ;
  keymap [ gac ( 'G' ) ] = 0x06AF ;
  keymap [ gac ( 'g' ) ] = 0x06D5 ;
  keymap [ gac ( 'H' ) ] = 0x062E ;
  keymap [ gac ( 'h' ) ] = 0x0649 ;
  keymap [ gac ( 'I' ) ] = 0x06AD ;
  keymap [ gac ( 'i' ) ] = 0x06AD ;
  keymap [ gac ( 'J' ) ] = 0x062C ;
  keymap [ gac ( 'j' ) ] = 0x0642 ;
  keymap [ gac ( 'K' ) ] = 0x06C6 ;
  keymap [ gac ( 'k' ) ] = 0x0643 ;
  keymap [ gac ( 'L' ) ] = 0x0644 ;
  keymap [ gac ( 'l' ) ] = 0x0644 ;
  keymap [ gac ( 'M' ) ] = 0x0645 ;
  keymap [ gac ( 'm' ) ] = 0x0645 ;
  keymap [ gac ( 'N' ) ] = 0x0646 ;
  keymap [ gac ( 'n' ) ] = 0x0646 ;
  keymap [ gac ( 'O' ) ] = 0x0648 ;
  keymap [ gac ( 'o' ) ] = 0x0648 ;
  keymap [ gac ( 'P' ) ] = 0x067E ;
  keymap [ gac ( 'p' ) ] = 0x067E ;
  keymap [ gac ( 'Q' ) ] = 0x0686 ;
  keymap [ gac ( 'q' ) ] = 0x0686 ;
  keymap [ gac ( 'R' ) ] = 0x0631 ;
  keymap [ gac ( 'r' ) ] = 0x0631 ;
  keymap [ gac ( 'S' ) ] = 0x0633 ;
  keymap [ gac ( 's' ) ] = 0x0633 ;
  keymap [ gac ( 'T' ) ] = 0x0640 ; // space filler character
  //keymap [ gac ( 'T' ) ] = 0x062A ;
  keymap [ gac ( 't' ) ] = 0x062A ;
  keymap [ gac ( 'U' ) ] = 0x06C7 ;
  keymap [ gac ( 'u' ) ] = 0x06C7 ;
  keymap [ gac ( 'V' ) ] = 0x06C8 ;
  keymap [ gac ( 'v' ) ] = 0x06C8 ;
  keymap [ gac ( 'W' ) ] = 0x06CB ;
  keymap [ gac ( 'w' ) ] = 0x06CB ;
  keymap [ gac ( 'X' ) ] = 0x0634 ;
  keymap [ gac ( 'x' ) ] = 0x0634 ;
  keymap [ gac ( 'Y' ) ] = 0x064A ;
  keymap [ gac ( 'y' ) ] = 0x064A ;
  keymap [ gac ( 'Z' ) ] = 0x0632 ;
  keymap [ gac ( 'z' ) ] = 0x0632 ;
  keymap [ gac ( '/' ) ] = 0x0626 ;
  
  // Uyghur punctuation marks
  keymap [ gac ( ';' ) ] = 0x061B ;
  keymap [ gac ( '?' ) ] = 0x061F ;
  keymap [ gac ( ',' ) ] = 0x060C ;

  // adapt parens, brackets, and braces for right-to-left typing
  keymap [ gac ( '{' ) ] = gac ( '}' ) ;
  keymap [ gac ( '}' ) ] = gac ( '{' ) ;
  keymap [ gac ( '[' ) ] = gac ( ']' ) ;
  keymap [ gac ( ']' ) ] = gac ( '[' ) ;
  keymap [ gac ( '(' ) ] = gac ( ')' ) ;
  keymap [ gac ( ')' ) ] = gac ( '(' ) ;

  // special handling of braces ( "{" and "}" ) for quotation in Uyghur
  // keymap [ gac ( '}' ) ] = 0x00AB ;
  // keymap [ gac ( '{' ) ] = 0x00BB ;

  // zero-out all entries first
  for ( i = 0 ; i < charmap.length ; i++ ) {
     charmap[i] = 0 ;
  }

  charmap[gac('A')] = 0x0627 ;
  charmap[gac('a')] = 0x0627 ;
  charmap[gac('B')] = 0x0628 ;
  charmap[gac('b')] = 0x0628 ;
  charmap[gac('C')] = 0x0643 ;
  charmap[gac('c')] = 0x0643 ;
  charmap[gac('D')] = 0x062F ;
  charmap[gac('d')] = 0x062F ;
  charmap[gac('E')] = 0x06D5 ;
  charmap[gac('e')] = 0x06D5 ;
  charmap[gac('F')] = 0x0641 ;
  charmap[gac('f')] = 0x0641 ;
  charmap[gac('G')] = 0x06AF ;
  charmap[gac('g')] = 0x06AF ;
  charmap[gac('H')] = 0x06BE ;
  charmap[gac('h')] = 0x06BE ;
  charmap[gac('I')] = 0x0649 ;
  charmap[gac('i')] = 0x0649 ;
  charmap[gac('J')] = 0x062C ;
  charmap[gac('j')] = 0x062C ;
  charmap[gac('K')] = 0x0643 ;
  charmap[gac('k')] = 0x0643 ;
  charmap[gac('L')] = 0x0644 ;
  charmap[gac('l')] = 0x0644 ;
  charmap[gac('M')] = 0x0645 ;
  charmap[gac('m')] = 0x0645 ;
  charmap[gac('N')] = 0x0646 ;
  charmap[gac('n')] = 0x0646 ;
  charmap[gac('O')] = 0x0648 ;
  charmap[gac('o')] = 0x0648 ;
  charmap[gac('P')] = 0x067E ;
  charmap[gac('p')] = 0x067E ;
  charmap[gac('Q')] = 0x0642 ;
  charmap[gac('q')] = 0x0642 ;
  charmap[gac('R')] = 0x0631 ;
  charmap[gac('r')] = 0x0631 ;
  charmap[gac('S')] = 0x0633 ;
  charmap[gac('s')] = 0x0633 ;
  charmap[gac('T')] = 0x062A ;
  charmap[gac('t')] = 0x062A ;
  charmap[gac('U')] = 0x06C7 ;
  charmap[gac('u')] = 0x06C7 ;
  charmap[gac('V')] = 0x06CB ;
  charmap[gac('v')] = 0x06CB ;
  charmap[gac('W')] = 0x06CB ;
  charmap[gac('w')] = 0x06CB ;
  charmap[gac('X')] = 0x062E ;
  charmap[gac('x')] = 0x062E ;
  charmap[gac('Y')] = 0x064A ;
  charmap[gac('y')] = 0x064A ;
  charmap[gac('Z')] = 0x0632 ;
  charmap[gac('z')] = 0x0632 ;

  charmap[PRIMe] = 0x06D0 ; // 'e
  charmap[PRIME] = 0x06D0 ; // 'E
  charmap[COLo]  = 0x06C6 ; // :o
  charmap[COLO]  = 0x06C6 ; // :O
  charmap[COLu]  = 0x06C8 ; // :u
  charmap[COLU]  = 0x06C8 ; // :U

  // Uyghur punctuation marks
  charmap [ gac(';') ] = 0x061B ;
  charmap [ gac('?') ] = 0x061F ;
  charmap [ gac(',') ] = 0x060C ;

  // zero-out all entries first
  for ( i = 0 ; i < akmap.length ; i++ ) {
     akmap[i] = 0 ;
  }

  for ( i = 0 ; i < uyghur_keys.length ; i++ ) {
     ch   = uyghur_keys [ i ] ;
     code = ak_keymap [ i ] ;

     akmap [ code ] = keymap [ gac(ch) ] ;
  }

  // zero-out all entries first
  for ( i = 0 ; i < iymap.length ; i++ ) {
     iymap[i] = 0 ;
  }

  for ( i = 0 ; i < uyghur_keys.length ; i++ ) {
     ch   = uyghur_keys [ i ] ;
     code = iy_keymap [ i ] ;

     iymap [ code ] = keymap [ gac(ch) ] ;
  }
}

// Al-Katip to standard Unicode
function ak2uy ( akstr )
{
   var tstr = "" ;
   for ( i = 0 ; i < akstr.length ; i++ ) {
      code = akstr.charCodeAt(i) ;
      if ( code < BPAD || code >= BPAD + akmap.length ) {
         tstr = tstr + akstr.charAt(i) ; 
         continue ;
      }

      code = code - BPAD ; 

      if ( code < akmap.length && akmap[code] != 0 ) {
         tstr = tstr + String.fromCharCode ( akmap[code] ) ;
      } else {
         tstr = tstr + akstr.charAt(i) ; 
      }
   }

   return tstr ;
}

// IlikYurt to standard Unicode
function iy2uy ( str )
{
   var tstr = "" ;
   for ( i = 0 ; i < str.length ; i++ ) {
      code = str.charCodeAt(i) ;
      if ( code > akmap.length ) {
         tstr = tstr + str.charAt(i) ; 
         continue ;
      }

      if ( iymap[code] != 0 ) {
         tstr = tstr + String.fromCharCode ( iymap[code] ) ;
      } else {
         tstr = tstr + str.charAt(i) ; 
      }
   }

   return tstr ;
}

function uky2uy ( ustr )
{
  var str = "" ;
  var cur, prev, next, ch ;
  var ccode, ncode ;
  var wdbeg = true ;

  var begdelim = '`' ;  // beginning delimiter
  var enddelim = '`' ;  // ending delimiter

  var verbatim = false ;

  // make URL addresses that begin with http(s), ftp,... verbatim
  var regExp = /(\w+[p|s]:\/\/\S*)/gi;
  var ukystr = ustr.replace(regExp, begdelim + "$1" + enddelim );

  // make URL addresses that do not start with http(s) verbatim
  regExp = /([\s|(]+\w+\.\w+\.\w+\S*)/g ;
  ukystr = ukystr.replace(regExp, begdelim + "$1" + enddelim );

  // make two-part URL addresses (e.g. ukij.org) verbatim only if closed by space or parens 
  regExp = /([\s|(]+\w+\.\w+[\s|)])/g ;
  ukystr = ukystr.replace(regExp, begdelim + "$1" + enddelim );

  // make email addresses verbatim
  regExp = /(\w+@\w+\.\w[\w|\.]*\w)/g ;
  ukystr = ukystr.replace(regExp, begdelim + "$1" + enddelim );

  // make some common English terms verbatim
  regExp = /(google|yahoo|tcp|unix|linux|apple|windows)([\s|\/|\!]+)/gi ;
  ukystr = ukystr.replace(regExp, begdelim + "$1" + enddelim + "$2" );

  if ( !inited ) {
    init() ;
  }

  for ( i = 0 ; i < ukystr.length ; i++ ) {
     ch = 0 ;
     cur    = ukystr.charAt(i) ;
     next   = ukystr.charAt(i+1) ;
     ccode  = ukystr.charCodeAt(i) ;
     ncode  = ukystr.charCodeAt(i+1) ;

     if ( verbatim == true ) {
        if ( cur == enddelim ) { // ending verbatim mode
           verbatim = false ;
        } else {
           str += cur ; 
        }
        continue ;
     }

     if ( cur == begdelim ) {
        verbatim = true ;
        continue ;
     }

     /* In some words that come from foreign languages, such as zhungxua, jiayuguan, etc.,
      * we use medial forms of AA or AE. Compare this to Uyghur word sual, for example.
      * By default, we use beginning forms of AA and AE in such cases, as in normal Uyghur.
      * To force medial forms, put a '|' between vowels, e.g., "shinxu|a".
      */
     if ( cur == '|' && ( prev == 'u' || prev == 'U' ) &&
           ( next == 'a' || next == 'A' || next == 'e' || next == 'E' ) ) {
         wdbeg = false ;
         continue ;
     }

     // add hamza in front of vowels in word-beginning positions
     if ( wdbeg == true ) {
        if ( isvowel(cur) ) {
           str += String.fromCharCode(HAMZA) ;
        }
     } else {
        // wdbeg == false means prev is a non-vowel letter
        if ( cur == '\'' || ccode == RCQUOTE ) {
          /* we try to force a hamza in certain occasions, e.g., compare 
           * suret (picture) and sur'et (velocity). To minimize the effects
           * of this substitution, we only do this if "'" is fllowed by a
           * vowel and it is not in the word-beginning position. 
           */
           if ( isvowel(next) ) {
              wdbeg = false ; // don't add another hamza in next round
              str += String.fromCharCode(HAMZA) ;
              continue ;
           } else if ( isalpha(ncode) ) {
              /* Besides, we also want to separate two letters that form
               * joint letter using "'". For example, to avoid the "ng" 
               * from being treated as a joint letter NGEE in words
               * yemenge, yigenge,...,  a "'" can be placed between them.
               * For example, yemen'ge, yigen'ge,... .
               */
              continue ;
           }
        }
     }

     // AA, AE, and non-alpha-numeric letters makes word beginning
     if ( isvowel(cur) || !isalpha(ccode) ) {
        wdbeg = true ;
     } else { 
        wdbeg = false ;
     }

     switch ( cur ) {
        case 'c':
        case 'C':
           if ( next == 'h' || next == 'H' ) {
              ch = CHEE ;
           }    
           break ;
       case 'g':
       case 'G':
          if ( next == 'h' || next == 'H' ) {
             ch = GHEE ;
          }
          break ;
       case 'n': 
       case 'N':
          if ( next == 'g' || next == 'G' ) { 
             /* for cases where we have a sequence of ngh, it could be
              * translated as either NGEE + EHE or NEE + GHEE. However, the
              * latter is much more common than the former in Uyghur language
              * and we opt to translate it as NEE + GHEE. If there is a
              * need to have NGEE + EHE, a single quote ("'") can be used.
              */
             tmpch = ukystr.charAt(i+2) ; 
             if ( tmpch != 'h' && tmpch != 'H' ) {
                ch = NGEE ;
             }
          }
          break ;
       case 's':
       case 'S':
          if ( next == 'h' || next == 'H' ) {
             ch = SHEE ;
          } else if ( next == 'z' || next == 'Z' ) {
             // UKY does not provide a unique SZEE, we take joint 
             // letters "sz" for SZEE, as in purszin [spring (coil)]
             ch = SZEE ;
          }
          break ;
       default:
          break ;
     }

     if ( ch != 0 ) {
        i++ ; // there is a joint letter, advance index
        str += String.fromCharCode(ch) ;
     } else if ( charmap[ccode] ) {
        str += String.fromCharCode( charmap[ccode] ) ; // no joint letter, but valid UKY
     } else {
        str += String.fromCharCode(ccode) ; // non-UKY, return whatever is entered
     }

     prev = cur ;
  }

  return str ;
}

// isvowel -- returns true if ch is a vowel in Uyghur
function isvowel ( ch )
{
  var code = gac ( ch ) ; 

  if ( ch == 'a' || ch == 'A' || ch == 'e' || ch == 'E' ||
       ch == 'i' || ch == 'I' || ch == 'o' || ch == 'O' || 
       ch == 'u' || ch == 'U' ) {
    return true ;
  }

  if ( code == PRIMe || code == PRIME || code == COLo ||
       code == COLO || code == COLu || code == COLU ) {
    return true ;
  } 

  return false ;
}

function isalpha ( code )
{
   if ( (gac('A') <= code && code <= gac('Z')) ||
          (gac('a') <= code && code <= gac('z')) ) {
      return true ;
   }
   return false ;
}

// attach event handlers to textareas and textfields
function attachEvents ( )
{    
   if ( typeof(attachAll)=="undefined" || attachAll == null ) {
       attachAll = false ;
   }
   if ( typeof(bedit_allow) != "undefined" && bedit_allow && bedit_allow.length != 0 ) {
      allowed_names = bedit_allow.split ( ':' ) ;
   } else {
      allowed_names = null ;
   }    
   if ( typeof(bedit_deny) != "undefined" && bedit_deny && bedit_deny.length != 0 ) {
      denied_names = bedit_deny.split ( ':' ) ;
   } else {
      denied_names = null ;
   }      
       
   var tas = document.getElementsByTagName("TEXTAREA") ; // textareas
   var tfs = document.getElementsByTagName("INPUT") ; // input fields
     
   for ( i = 0 ; i < tas.length ; i++ ) {
     // if object already has a onKeyPress event handler, we don't attach another.
     if ( tas[i].onkeypress != null ) {
        continue ;
     }

     if ( ! shouldAttach(tas[i].name) ) { // we should not attach keypress event to this object
        continue ;
     }

     if ( isIE ) {
        tas[i].attachEvent ( 'onkeypress', naddchar ) ;
     } else if ( isGecko ) {
        tas[i].addEventListener ( 'keypress', naddchar, false ) ;
     }
   }

   for ( i = 0 ; i < tfs.length ; i++ ) {
     ttype = tfs[i].type.toLowerCase() ;
     if ( ttype == "text" ) {

       // if object already has a onKeyPress event handler, we don't attach another.
       if ( tfs[i].onkeypress != null ) {
          continue ;
       }

       if ( ! shouldAttach(tfs[i].name) ) { // we should not attach keypress event to this object
          continue ;
       }

       if ( isIE ) {
          tfs[i].attachEvent ( 'onkeypress', naddchar ) ;
       } else if ( isGecko ) {
          tfs[i].addEventListener ( 'keypress', naddchar, false ) ;
       }
     }
   }
}

//setTimeout ( "attachEvents()", 200 ) ;
//window.onload = attachEvents ;

// we want to use onLoad event to trigger addEvents function. But in case an onLoad event handler
// has already been registered, we also want to execute that handler.
old_onLoad = null ;
add_onLoad() ;
function add_onLoad ( )
{
   old_onLoad = window.onload;
   window.onload = new_onLoad ;
}

function new_onLoad ( )
{
   attachEvents() ;
   if ( old_onLoad ) {
      odd_onLoad() ;
   }
}

function shouldAttach ( name )
{
   if ( attachAll == true ) {
      if ( denied_names == null ) {
         return true ;
      }

      for ( j = 0 ; j < denied_names.length ; j++ ) {
         if ( name == denied_names[j] ) {
            return false ;
         }
      }

      return true ;
   } else { // global attach is disabled, only attach those that are specified
      if ( allowed_names == null ) {
         return false ;
      }

      for ( j = 0 ; j < allowed_names.length ; j++ ) {
         if ( name == allowed_names[j] ) {
            return true ;
         }
      }

      return false ;
   }
}

function addchar(content, event) 
{
   return naddchar(event) ;
}

// addchar
function naddchar(event)
{
   if ( !event ) {
      event = window.event ;
   }

   var content ;

   if ( event.srcElement ) {
     content = event.srcElement ;
   } else if ( event.target ) {
     content = event.target ;
   }

   var key ;
   var itoggle = false ;
   var dirtoggle = false ;
   var pasteUKY = false ;
   var pasteAk = false ; // paste from Al-Katip text 
   var pasteIy = false ; // paste from IlikYurt text, currently not in use
   var spellcheck = false; // spellcheck request

   if ( !inited ) {
      init() ;
   }

   if ( isIE ) {
     key = event.keyCode ;
     if ( event.ctrlKey ) {
        if ( isMaxthon && key == 2 ) { // for Maxthon browser: Ctrl-B toggles imode
           itoggle = true ;
        }

        if ( key == 11 ) { // control-K pressed, toggle input mode
           itoggle = true ;
        } else if ( key == 7 ) { // control-G, spellcheck (imla)
           spellcheck = true ;
        } else if ( key == 10 ) { // control-J, paste from Al-Katip 
           pasteAk = true ;
        } else if ( key == 20 ) { // control-T, toggle direction 
           dirtoggle = true ;
        } else if ( key == 21 ) { // control-U, paste from UKY
           pasteUKY = true ;
        }
     }
   } else { // assuming Gecko
     key = event.which ;
     if ( event.ctrlKey ) {
        if ( key == 107 ) { // control-K pressed, toggle
           itoggle = true ;
        } else if ( key == 103 ) { // control-G, spellcheck (imla) 
           spellcheck = true ;
        } else if ( key == 106 ) { // control-J, paste from Al-Katip 
           pasteAk = true ;
        } else if ( key == 116 ) { // control-T, toggle direction 
           dirtoggle = true ;
        } else if ( key == 117 ) { // control-U, paste from UKY
           pasteUKY = true ;
        } else { // enable default handling other keys for Mozilla/FireFox
          event.returnValue = true ;
          return true ;
        }
     }
   }

   if ( itoggle ) {
      imode = 1 - imode ;

      if ( isGecko ) {
         event.preventDefault() ;
      }

      event.returnValue = false ;
      return false ;
   } else if ( dirtoggle ) {
      if ( content.style.direction == "rtl" ) {
         content.style.direction = "ltr" ;
      } else if ( content.style.direction == "ltr" ) {
         content.style.direction = "rtl" ;
      } else { // if nothing is defined, set it to left-to-right on toggle 
         content.style.direction = "ltr" ;
      }

      if ( isGecko ) {
         event.preventDefault() ;
      }

      event.returnValue = false ;
      return false ;
   } else if ( pasteUKY || pasteAk ) {
     // due to security constraints, Mozilla/FireFox does not seem allow 
     // to get/set clipboard data, so we transform selected text in textarea
      if ( isIE ) { 
         cbtext = clipboardData.getData("Text");
      } else if ( isGecko ) {
         cbtext = content.value.substr(content.selectionStart, content.selectionEnd+1); 
      }

      if ( cbtext ) {
         if ( pasteUKY ) {
            uystr = uky2uy ( cbtext ) ; 
         } else if ( pasteAk ) {
            uystr = ak2uy ( cbtext ) ; 
         } else if ( pasteIy ) {
            uystr = iy2uy ( cbtext ) ; 
         }

         if ( isIE ) {
            document.execCommand ( "paste", false, uystr ) ;
         } else if ( isGecko ) {
            var selstart = content.selectionStart ;
            var selend   = content.selectionEnd ;
            content.value = content.value.substring (0, selstart) + uystr + content.value.substr ( selend ) ;
            content.setSelectionRange(selstart + uystr.length, selstart + uystr.length );
         }
      }

      if ( isGecko ) {
         event.preventDefault() ;
      }

      event.returnValue = false ;
      return false ;
   } else if ( spellcheck == true ) {
      var tid = content.id ;
      var tname = content.name ;

      if ( !tid ) {
         if ( tname ) {
            content.id = tname ;
         }
      }

      if ( content.id ) {
         checkSpell( content.id );
      } else {
         spellObj = content;
         checkSpell();
      }

      event.returnValue = false ;
      return false ;
   }

   if ( imode == 0 && ( keymap[key] != 0 || key == gac ('"') ) ) {
      if ( isIE ) {
         if ( key == gac ( '"' )  ) {
            if ( qmode == 0 ) { // opening quote
               event.keyCode = OQUOTE
            } else { // closing quote
               event.keyCode = CQUOTE
            }
            qmode = 1 - qmode ; // toggle quote mode
         } else {
            event.keyCode = keymap[key] ;
         }
      } else if ( isGecko ) {
         var input ;
         // we cannot modify event.which in Mozilla/FireFox, have to do something more interesting
         if ( key == gac ( '"' )  ) {
            if ( qmode == 0 ) { // opening quote
               input = OQUOTE
            } else { // closing quote
               input = CQUOTE
            }
            qmode = 1 - qmode ; // toggle quote mode
         } else {
            input = keymap[ key ] ; 
         }

         var selstart = content.selectionStart ;
         var selend   = content.selectionEnd ;
         var insStr = String.fromCharCode ( input ) ;

         // Mozilla/Firefox does not show the cursor after we pass the textarea size
         // store the scroll info before changing text and restore them before we 
         // do setSelectionRange so that the cursor will be visible after keypress
         var scrollTop, scrollLeft;
         if (content.type == 'textarea' && typeof content.scrollTop != 'undefined') {
            scrollTop = content.scrollTop;
            scrollLeft = content.scrollLeft;
         }
         content.value = content.value.substring (0, selstart) + insStr + content.value.substr(selend);
         if (typeof scrollTop != 'undefined') {
            content.scrollTop = scrollTop;
            content.scrollLeft = scrollLeft;
         }
         content.setSelectionRange(selstart + insStr.length, selstart + insStr.length );

         if ( isGecko ) {
            event.preventDefault() ;
         }

         event.returnValue = false ;
         return false ;
      }
   } 

   event.returnValue = true ;
   return true ;
}
