#include <string.h>
#include <stdio.h>
#include <ctype.h>
#include "scanner.h"

char* exprToBeParsed = "315+42*6";
unsigned int position = 0;

int strInit(str *s) {
	if (s == NULL) {
		return ERROR;
	}
	s->str = NULL;
	if ((s->str = (char *) malloc(STR_INIT_LENGTH)) == NULL) {
		return ERROR;
	}
	s->str[0] = '\0';
	s->length = 0;
	s->allocSize = STR_INIT_LENGTH;
	return SUCCESS;
}

str *strNew() {
	str *s = NULL;
	if ((s = (str*) malloc(sizeof(str))) == NULL) {
		return NULL;
	}
	if (strInit(s) == ERROR) {
		free(s);
		s = NULL;
		return NULL;
	}
	return s;
}

void strDeinit(str *s) {
	if (s == NULL || s->str == NULL) {
		return;
	}
	free(s->str);
	s->str = NULL;
	s->length = 0;
	s->allocSize = 0;

}

void strClear(str *s) {
	if (s == NULL || s->str == NULL) {
		return;
	}
	s->str[0] = '\0';
	s->length = 0;
}

int strAddChar(str *s, char c) {
	if (s == NULL || s->str == NULL) {
		return ERROR;
	}
	if (s->length + 1 >= s->allocSize) {
		// out of alocated memory, need realocation
    	if ((s->str = (char*) realloc(s->str, s->allocSize * 2)) == NULL) {
        	return ERROR;
    	}
  		s->allocSize = s->allocSize * 2;
	}
	s->str[s->length] = c;
	s->length++;
	s->str[s->length] = '\0';
	return ERROR;
}

void strFree(str *s) {
	if (s == NULL) {
		return;
	}
	strDeinit(s);
	free(s);
}

Token* newToken() {
	Token *token = calloc(1, sizeof(Token));
	if (token != NULL) {
		token->type = TT_empty;
	}

	return token;
}

void freeToken(Token **token) {
	if (token != NULL) {
		if (*token != NULL) {
			free(*token);
			*token = NULL;
		}
	}
}

int getToken(Token* token) {
	unsigned int symbol;

	// symbol = exprToBeParsed[position];
	// printf("Toto je moj symbol: %c\n", symbol);

	State state = S_empty;
	str* s = strNew();

	while(1) {
		if (position > strlen(exprToBeParsed)) {
			strFree(s);
			return 1;
		}
		symbol = exprToBeParsed[position];
		switch(state) {
			case S_empty:
				if (isdigit(symbol)) {
					state = S_integer;
					break;
				} else {
					switch(symbol) {
						case '+' :
						token->type = TT_plus;
						position++;
						return 0;

						case '-' :
						token->type = TT_minus;
						position++;
						return 0;

						case '*' :
						token->type = TT_multiply;
						position++;
						return 0;

						case '/' :
						token->type = TT_divide;
						position++;
						return 0;

						case '(' :
						token->type = TT_leftBracket;
						position++;
						return 0;

						case ')' :
						token->type = TT_rightBracket;
						position++;
						return 0;

						case '!' :
						token->type = TT_factorial;
						position++;
						return 0;

						case '^' :
						token->type = TT_power;
						position++;
						return 0;

						default :
						position++;
						token->type = TT_other;
					
					} //switch
			
			case S_integer:
				if (isdigit(symbol)) {
					state = S_integer;
					position++;
					strAddChar(s, symbol);
					break;
				} else if (symbol == '.') {
					state = S_real;
					position++;
					strAddChar(s, symbol);
					break;
				} else {
					token->type = TT_number;
					token->value = (double) atoi(s->str);
					strClear(s);
					state = S_empty;
					strFree(s);
					return 0;
				}

			case S_real:
				if (isdigit(symbol)) {
					state = S_real;
					position++;
					strAddChar(s, symbol);
				} else {
					token->type = TT_number;
					token->value = strtod(s->str, NULL);
					strClear(s);
					state = S_empty;
					strFree(s);
					return 0;
				}
			}
		}

	} //while
	strClear(s);
	strFree(s);
	return 0;
}

int main()
{
	
	Token* token = newToken();
	int ret;
	while((ret = getToken(token)) == 0) {
		printf("%d %f\n", token->type, token->value);
		token->type = TT_empty;
		token->value = 0.0;
	}
	freeToken(&token);

	return 0;
}
