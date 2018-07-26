
flyd-until = require "./main.js"

flyd = require "flyd"

wait = (t,f) -> setTimeout f,t


fail = (num) !->

  console.error "[TEST ERROR] originating from module [ github.com/sourcevault/#{MODULE_NAME} ]\\n

  \t - 'npm test' failed at TEST #{num}. \n

  "

  process.exitCode = 1


#  TEST TYPE :: Functionality Tests

# # <| TEST 1 |>

send = flyd.stream!

$send = flyd-until 3,send

vals = []

$send.map (x) !->

  vals.push x

do

  <-! wait 100

  send 1

do

  <-! wait 100

  send 2

do

  <-! wait 100

  send 3

do

  <-! wait 100

  send 4

do

  <-! wait 100

  send 5

do

  <-! wait 103

  if not vals.length is 3

    fail 1


#  TEST TYPE :: Throw Error Tests

# # <| TEST 2 |>

console.log "<| TEST 2 |>"

flyd-until 1.2,send


# # <| TEST 3 |>

console.log "<| TEST 3 |>"

flyd-until -1,send

# # <| TEST 4 |>

console.log "<| TEST 4 |>"

flyd-until -1.3,send

# # <| TEST 5 |>

console.log "<| TEST 5 |>"

flyd-until {},send

# # <| TEST 6 |>

console.log "<| TEST 6 |>"

flyd-until !->,send

# # <| TEST 7 |>

console.log "<| TEST 7 |>"

flyd-until null,send

# # <| TEST 8 |>

console.log "<| TEST 8 |>"

flyd-until undefined,send

# # <| TEST 9 |>

console.log "<| TEST 9 |>"

flyd-until Infinity,send

# # <| TEST 10 |>

console.log "<| TEST 10 |>"

flyd-until 100,{}

# # <| TEST 11 |>

console.log "<| TEST 11 |>"

flyd-until 100,[]

