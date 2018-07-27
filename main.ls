
flyd = require "flyd"

initial-utils = require "@sourcevault/initial.utils"

{is-positive-integer-number} = initial-utils.numTypes

throwError = require "./throwError"

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


















