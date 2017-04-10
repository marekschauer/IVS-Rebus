TEMPLATE = app
TARGET = calc

QT += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

HEADERS       += button.h \
                calculator.h
SOURCES       += button.cpp \
                calculator.cpp \
                main.cpp
