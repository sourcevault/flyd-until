FLYD_URL = "github.com/paldepind/flyd"

flyd = require "flyd"

R = require "ramda"

initial-utils = require "@sourcevault/initial.utils"

{numTypes} = initial-utils

{is-positive-integer-number} = numTypes

print = initial-utils.printError.create do

  "flyd-until"
  "github.com/sourcevault/flyd-until"




throwError = {}

throwError.not-flyd-stream = ->

  color = print.getColor!


  fs = color.highlight('flyd stream')

  f = color.highlight('flyd')

  err-text = """
  - second argument (stream) is of wrong type.
    - stream value should be a #{fs} object.

    - more details on [#{f}] can be read at:
      #{color.highlight(FLYD_URL)}

  """

  print.throwTypeError err-text


expected-type = ["number", "positive", "integer" ]


andJoin = (list) ->

  switch list.length

  | 0 => ""

  | 1 => list.join ""

  | 2 =>

    ret = list[0] + " and " + list[1]

    ret

  | otherwise =>


    head = (R.init list) |> R.join ", "

    tail = "and " + (R.last list)

    head + " " + tail




throwError.amount-is-not-integer = (type) !->

  color = print.getColor!

  colorized-expected-type = R.map color.highlight,expected-type

  expected-type-str = andJoin colorized-expected-type

  des = type.getDes!

  wrong-props = R.difference des,expected-type

  correct-parts =  R.intersection des,expected-type

  correct-parts-str = des |> R.intersection expected-type |> R.map color.highlight

  wrong-props-str = R.map color.attention1,wrong-props

  colorized = R.concat wrong-props-str, correct-parts-str

  unexpected-type-str = andJoin colorized


  err-text = """
  - first argument (amount) is of wrong type.
    - amount value should be a #{expected-type-str}.
    - current type is #{unexpected-type-str}.

  """


  print.throwTypeError err-text





flyd = require "flyd"

wait = (t,f) -> setTimeout f,t

_until = (amount,stream) ->

  count = 0

  flyd.combine do

    (downstream,self) ->

      if (count < amount)

        count += 1

        if count is amount

          do

            <- wait 0

            downstream.end true


        return downstream!


      else

        downstream.end true

        return void

    [stream]





validate_and_run = (amount,stream) ->

  if not (flyd.isStream stream)

    throwError.not-flyd-stream!

    return null

  [is-correct-type,type] = is-positive-integer-number amount


  if is-correct-type

    _until amount,stream

  else

    throwError.amount-is-not-integer type

    return null



module.exports = flyd.curryN 2 ,validate_and_run


















