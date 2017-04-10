#include <QtGui>

#include <QGridLayout>
#include <QLineEdit>
#include <math.h>
#include <ctype.h>

#include "button.h"
#include "calculator.h"

Calculator::Calculator(QWidget *parent)
    : QWidget(parent)
{
    digit = false;
    display = new QLineEdit("0");
    display->setReadOnly(true);
    display->setAlignment(Qt::AlignRight);
    display->setMaxLength(255);
    QFont font = display->font();
    font.setPointSize(font.pointSize() + 8);
    display->setFont(font);

    for (int i = 0; i < NumDigitButtons; ++i) {
        digitButtons[i] = createButton(QString::number(i), SLOT(digitClicked()));
    }

    Button *pointButton = createButton(tr("."), SLOT(pointClicked()));
//    Button *changeSignButton = createButton(tr("\261"), SLOT(changeSignClicked()));

    Button *backspaceButton = createButton(tr("Backspace"), SLOT(backspaceClicked()));

    Button *clearAllButton = createButton(tr("C"), SLOT(clearAll()));

    Button *divisionButton = createButton(tr("/"), SLOT(multiplicativeOperatorClicked()));
    Button *timesButton = createButton(tr("*"), SLOT(multiplicativeOperatorClicked()));
    Button *minusButton = createButton(tr("-"), SLOT(additiveOperatorClicked()));
    Button *plusButton = createButton(tr("+"), SLOT(additiveOperatorClicked()));

    Button *squareRootButton = createButton(tr("Sqrt(y)"), SLOT(powAndSqrt()));
    Button *powerButton = createButton(tr("^y"), SLOT(powAndSqrt()));
//    Button *reciprocalButton = createButton(tr("1/x"), SLOT(unaryOperatorClicked()));
    Button *equalButton = createButton(tr("="), SLOT(equalClicked()));
    Button *factorialButton = createButton(tr("x!"), SLOT(factorialClicked()));
    Button *sinButton = createButton(tr("sin(x)"), SLOT(sinClicked()));
//    Button *leftBracketButton = createButton(tr("("), SLOT(leftBracketClicked()));
//    Button *rightBracketButton = createButton(tr(")"), SLOT(rightBracketClicked()));

    QGridLayout *mainLayout = new QGridLayout;

    mainLayout->setSizeConstraint(QLayout::SetFixedSize);

    mainLayout->addWidget(display, 0, 0, 1, 5);
    mainLayout->addWidget(backspaceButton, 1, 0, 1, 2);
    mainLayout->addWidget(clearAllButton, 1, 2, 1, 1);
    mainLayout->addWidget(factorialButton, 4, 4, 1, 1);
    mainLayout->addWidget(sinButton, 5,4,1,1);
//    mainLayout->addWidget(leftBracketButton, 1, 4, 1, 1);
//    mainLayout->addWidget(rightBracketButton, 1, 5, 1, 1);

//    for (int i = 1; i < NumDigitButtons; ++i) {
//        int row = ((9 - i) / 3) + 2;
//        int column = ((i - 1) % 3) + 1;
//        mainLayout->addWidget(digitButtons[i], row, column);
//    }

    mainLayout->addWidget(digitButtons[0], 5, 0, 1, 1);
    mainLayout->addWidget(digitButtons[1], 4, 0, 1, 1);
    mainLayout->addWidget(digitButtons[2], 4, 1, 1, 1);
    mainLayout->addWidget(digitButtons[3], 4, 2, 1, 1);
    mainLayout->addWidget(digitButtons[4], 3, 0, 1, 1);
    mainLayout->addWidget(digitButtons[5], 3, 1, 1, 1);
    mainLayout->addWidget(digitButtons[6], 3, 2, 1, 1);
    mainLayout->addWidget(digitButtons[7], 2, 0, 1, 1);
    mainLayout->addWidget(digitButtons[8], 2, 1, 1, 1);
    mainLayout->addWidget(digitButtons[9], 2, 2, 1, 1);

    mainLayout->addWidget(digitButtons[0], 5, 1);
    mainLayout->addWidget(pointButton, 5, 1);
//    mainLayout->addWidget(changeSignButton, 5, 3);

    mainLayout->addWidget(divisionButton, 2, 3);
    mainLayout->addWidget(timesButton, 3, 3);
    mainLayout->addWidget(minusButton, 4, 3);
    mainLayout->addWidget(plusButton, 5, 2);

    mainLayout->addWidget(squareRootButton, 2, 4);
    mainLayout->addWidget(powerButton, 3, 4);
//    mainLayout->addWidget(reciprocalButton, 4, 5);
    mainLayout->addWidget(equalButton, 5, 3);
    setLayout(mainLayout);

    setWindowTitle(tr("Calculator"));
}

void Calculator::digitClicked()
{
    Button *clickedButton = qobject_cast<Button *>(sender());

    if (this->data.right(1) != "!")
    {
        this->data += clickedButton->text();
        this->befLast = this->last;
        this->last = clickedButton->text();
        this->digit = true;
        this->lastDigit += this->last;
    }

    display->setText(this->data);
}

void Calculator::factorialClicked(){
    Button *clickedButton = qobject_cast<Button *>(sender());

    if (digit && isNum(this->last) && !this->last.isEmpty() && this->data.right(1) != "!")
    {
        //volani fce pro factorial
        this->data += "!";
        display->setText(this->data);

    }
}

void Calculator::sinClicked(){
    Button *clickedButton = qobject_cast<Button *>(sender());
    //
    if (!digit)
        this->data += "sin(";

    display->setText(this->data);

}

//void Calculator::rightBracketClicked(){
//    this->data += ")";
//    digit   =   true;
//    display->setText(this->data);
//}

//void Calculator::leftBracketClicked(){
//    this->data += "(";
//    digit = false;

//    display->setText(this->data);
//}

void Calculator::powAndSqrt()
{
    Button *clickedButton = qobject_cast<Button *>(sender());
    QString tmp = clickedButton->text();
    if (digit){
        if(tmp.toStdString().compare("^y") == 0)
        {
            this->data += "^";
            this->befLast = this->last;
            this->last = "^";
        }
        else
        {
            this->data += "Sqrt(";
            this->befLast = this->last;
            this->last = "Sqrt(";
        }

        digit = true;
    }
    display->setText(this->data);
}

void Calculator::additiveOperatorClicked()
{
    Button *clickedButton = qobject_cast<Button *>(sender());

    if (isNum(this->last) && digit && !this->last.isEmpty())
    {
        this->data += clickedButton->text();
        this->befLast = this->last;
        this->last = clickedButton->text();
        display->setText(this->data);
        digit = false;
    }

}

void Calculator::multiplicativeOperatorClicked()
{
    Button *clickedButton = qobject_cast<Button *>(sender());

    if (isNum(this->last) && digit && !this->last.isEmpty())
    {
        this->data += clickedButton->text();
        this->befLast = this->last;
        this->last = clickedButton->text();
        display->setText(this->data);
        digit = false;
    }

}

void Calculator::equalClicked()
{
    // volaní precedenčky bude tady, posílat se bude this->data.
//    double t = precedence(this->data.toStdString());
    
//    display->setText(t);
    
}

void Calculator::pointClicked()
{
    if (isNum(this->last) && digit && !this->last.isEmpty())
    {
        this->data += ".";
        display->setText(this->data);
        digit = false;
    }
}

void Calculator::backspaceClicked()
{
    if (this->data.isEmpty())
    {
        display->setText("0");
    }
    else
    {
        this->data.chop(1);
        if (this->data.length() > 1)
        {
            QString tmp = this->data.right(2);
            tmp += this->data.right(1);
            this->last = tmp.right(1);
            this->befLast = tmp.left(1);
            if (isNum(this->last))
                this->digit = true;
            else
                this->digit = false;
        }
        else
        {
            this->last = this->data;
            this->befLast = "";
            if (isNum(this->last))
                this->digit = true;
            else
                this->digit = false;
        }
    }
    display->setText(this->data);
}

void Calculator::clearAll()
{
    this->data.clear();
    this->last.clear();
    this->befLast.clear();
    this->digit = false;
    display->setText("0");
}

Button *Calculator::createButton(const QString &text, const char *member)
{
    Button *button = new Button(text);
    connect(button, SIGNAL(clicked()), this, member);
    return button;
}

void Calculator::abortOperation()
{
    clearAll();
    display->setText(tr("ERROR"));
}

bool Calculator::isNum(QString str){
    QRegExp re("\\d*");
    if (re.exactMatch(str))
        return true;
    else
        return false;
}
