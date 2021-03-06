FLYD_URL = "github.com/paldepind/flyd"

initial-utils = require "@sourcevault/initial.utils"

_ = require "ramda"

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


    head = (_.init list) |> _.join ", "

    tail = "and " + (_.last list)

    head + " " + tail


throwError.amount-is-not-integer = (type) !->

  color = print.getColor!

  colorized-expected-type = _.map color.highlight,expected-type

  expected-type-str = andJoin colorized-expected-type

  des = type.getDes!

  wrong-props = _.difference des,expected-type

  correct-parts =  _.intersection des,expected-type

  correct-parts-str = des |> _.intersection expected-type |> _.map color.highlight

  wrong-props-str = _.map color.attention1,wrong-props

  colorized = _.concat wrong-props-str, correct-parts-str

  unexpected-type-str = andJoin colorized


  err-text = """
  - first argument (amount) is of wrong type.
    - amount value should be a #{expected-type-str}.
    - current type is #{unexpected-type-str}.

  """

  print.throwTypeError err-text


module.exports = throwError