#include <QWidget>

class QLineEdit;

class Button;

class Calculator : public QWidget
{
    Q_OBJECT

public:
    Calculator(QWidget *parent = 0);

private slots:
    void digitClicked();
//    void unaryOperatorClicked();
    void additiveOperatorClicked();
    void multiplicativeOperatorClicked();
    void equalClicked();
    void pointClicked();
    void powAndSqrt();
//    void changeSignClicked();
    void backspaceClicked();
    void factorialClicked();
    void sinClicked();
//    void rightBracketClicked();
//    void leftBracketClicked();
//    void clear();
    void clearAll();

//    void clearMemory();
//    void readMemory();
//    void setMemory();
//    void addToMemory();

private:
    Button *createButton(const QString &text, const char *member);
    void abortOperation();
    QString data;
    QString last;
    QString befLast;
    bool digit;
    QString lastDigit;

    bool isNum(QString str);
    QLineEdit *display;

    enum { NumDigitButtons = 10 };
    Button *digitButtons[NumDigitButtons];
};
