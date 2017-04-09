CC=gcc
CFLAGS=-std=c99 -Wall -Wextra -pedantic -lm -g

all:scanner.c
	$(CC) $(CFLAGS) scanner.c -o scanner
