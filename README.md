Game over = 30 missed balls
Detector = 10% vw

https://capik27.github.io/game-collector/

Выбор при первом разе рандом полный;
(загаданный выбор)

    {
        a: { win: W , loss: L, total: TA }, b: { win: W , loss: L, total: TB },
        maximum: M,
        total: T = TA + TB,
        lastResult: true/false?,
    }

Если TA == TB => a{W} = b{W} => Random()
############# => a{W} > b{W} => Random(вероятность a{W} что выпадет b)
############# => a{W} < b{W} => Random(вероятность b{W} что выпадет a)
Если TA >> TB ================> Random(вероятность ТA/T что выпадет b)
Если TA << TB ================> Random(вероятность ТB/T что выпадет a)

1.(a) a w = a: { win: 1 , loss: 0, total: 1 } => next b
2.(b) a l = a: { win: 1 , loss: 1, total: 2 } => next Random()

===================================

1. Random(a) - a
2. Random(a) - b
   ==> был реверс
3. Random(a)- a
4. next a - a => сменил выбор
5. Random(a)
