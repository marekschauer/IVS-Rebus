#include <stdlib.h>

typedef enum {
	TT_plus,			//0
	TT_minus,			//1
	TT_multiply,		//2
	TT_divide,			//3
	TT_number,			//4
	TT_leftBracket,		//5
	TT_rightBracket,	//6
	TT_factorial,		//7
	TT_power,			//8
	TT_other,			//9
	TT_empty,			//10
} TokenType;

typedef struct {
    TokenType type;
    double value;
} Token;

typedef enum {
	S_integer,
	S_real,
	S_empty
} State;



/**
 * String struct
 */
typedef struct {
	char *str;						//array of chars which ends with '\0'
	unsigned int length;			//actual length of string
	unsigned int allocSize;			//size of allocated memory
} str, *strPtr;

#ifndef SUCCESS
#define SUCCESS 0
#endif

#ifndef ERROR
#define ERROR -1
#endif

#ifndef STR_INIT_LENGTH
#define STR_INIT_LENGTH 8
#endif


/**
 * Initializes str structure and makes it empty with '\0' at the end.
 *
 * @param      s     str, structure representing string
 *
 * @return     STR_SUCCESS or STR_ERROR according to initialization result
 */
int strInit(str *s);

/**
 * @brief      Creates and initialises new str
 *
 * @return     Pointer to new str string structure on heap
 */
str *strNew();

/**
 * This function deinitializes dtStr structure (local) and makes it empty with '\0' at the end.
 *
 * @param      s     dtStr, structure representing string
 *
 * @return     STR_SUCCESS or STR_ERROR according to initialization result
 */
void strDeinit(str *s);

/**
 * @brief      Sets length of dtStr *s to 0 and first value in array of chars sets to '\0'
 *
 * @param      s     dtStr, structure representing string
 */
void strClear(str *s);

/**
 * @brief      Adds char to the end of given dtStr
 *
 * @param      s    dtStr, structure representing string
 * @param[in]  c    char to be added
 *
 * @return     STR_SUCCES or STR_ERROR according to the result of adding char
 */
int strAddChar(str *s, char c);

/**
 * @brief      This function deallocates memory allocated for dtStr s
 *
 * @param      s     dtStr, structure representing string
 */
void strFree(str *s);

/**
 * @brief      Makes a new token with type set to TT_empty
 *
 * @return     { description_of_the_return_value }
 */
Token* newToken();

/**
 * @brief      Frees the memory allocated for token
 *
 * @param      token  The token
 */
void freeToken(Token **token);

/**
 * @brief      Gets the token.
 *
 * @param      token  The token, where the data will be saved
 *
 * @return     0 if token was filled with data, another number when error occurs
 */
int getToken(Token* token);
