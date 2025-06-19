# BENCHMARK

## microservice (no cascade)
THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=15.94ms

TOTAL RESULTS 
    checks_total.......................: 39034   1300.985963/s

NETWORK
    data_received...........................................................: 9.0 MB 299 kB/s
    data_sent...............................................................: 3.8 MB 126 kB/s

## microservice (cascade)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=34.07ms

█ TOTAL RESULTS 
    checks_total.......................: 18761   625.065864/s

NETWORK
    data_received...........................................................: 4.3 MB 144 kB/s
    data_sent...............................................................: 1.8 MB 61 kB/s

## microservice (cascade, 50 VU)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=112.86ms

█ TOTAL RESULTS 
    checks_total.......................: 21410   712.800205/s
    vus.....................................................................: 50     min=50         max=50

NETWORK
    data_received...........................................................: 4.9 MB 164 kB/s
    data_sent...............................................................: 2.1 MB 69 kB/s


## microbackend (manifest cached, no module http cache, no min, no zip, 1 chunk)

THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=40.45ms

TOTAL RESULTS 
    checks_total.......................: 13222   440.383891/s

NETWORK
    data_received...........................................................: 2.8 MB 92 kB/s
    data_sent...............................................................: 1.3 MB 43 kB/s

## microbackend (no manifest cached, module http cache, no min, no zip, 1 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=20.63ms

█ TOTAL RESULTS 
    checks_total.......................: 30967   1032.054248/s

NETWORK
    data_received...........................................................: 6.4 MB 215 kB/s
    data_sent...............................................................: 3.0 MB 100 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 1 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.76ms

█ TOTAL RESULTS 
    checks_total.......................: 89177   2972.254294/s

NETWORK
    data_received...........................................................: 19 MB  618 kB/s
    data_sent...............................................................: 8.6 MB 288 kB/s

## microbackend (manifest cached, module http cache, min, no zip, 1 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.76ms

█ TOTAL RESULTS 
    checks_total.......................: 88954   2964.879996/s

NETWORK
    data_received...........................................................: 19 MB  617 kB/s
    data_sent...............................................................: 8.6 MB 287 kB/s

## microbackend (manifest cached, module http cache, min, zip, 1 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.94ms

█ TOTAL RESULTS 
    checks_total.......................: 88759   2958.349352/s

NETWORK
    data_received...........................................................: 19 MB  615 kB/s
    data_sent...............................................................: 8.6 MB 286 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8ms

█ TOTAL RESULTS 
    checks_total.......................: 92495   3082.896779/s

NETWORK
    data_received...........................................................: 19 MB  641 kB/s
    data_sent...............................................................: 8.9 MB 298 kB/s


## microbackend (manifest cached, module http cache, no min, no zip, 2 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.58ms

█ TOTAL RESULTS 
    checks_total.......................: 88034   2934.181896/s

NETWORK
    data_received...........................................................: 18 MB  610 kB/s
    data_sent...............................................................: 8.5 MB 284 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 3 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.54ms

█ TOTAL RESULTS 
    checks_total.......................: 103285  3442.533963/s

NETWORK
    data_received...........................................................: 22 MB  716 kB/s
    data_sent...............................................................: 10 MB  333 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 3 chunk)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=7.67ms

█ TOTAL RESULTS 
    checks_total.......................: 99092   3302.798617/s

NETWORK
    data_received...........................................................: 21 MB  687 kB/s
    data_sent...............................................................: 9.6 MB 320 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, cascade)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=22.34ms

█ TOTAL RESULTS 
    checks_total.......................: 31559   1051.721671/s

NETWORK
    data_received...........................................................: 6.6 MB 219 kB/s
    data_sent...............................................................: 3.1 MB 102 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, N chunk, cascade)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=24.14ms

█ TOTAL RESULTS 
    checks_total.......................: 29352   978.187707/s

NETWORK
    data_received...........................................................: 6.1 MB 204 kB/s
    data_sent...............................................................: 2.8 MB 95 kB/s


## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, cascade, 50 VU)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=95.33ms

█ TOTAL RESULTS 
    checks_total.......................: 30443   1013.597327/s
    vus.....................................................................: 50     min=50         max=50

NETWORK
    data_received...........................................................: 6.3 MB 211 kB/s
    data_sent...............................................................: 2.9 MB 98 kB/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, cascade, 10 VU, customFetch)

█ THRESHOLDS 
    http_req_duration
    ✓ 'p(99) < 200' p(99)=8.77ms

█ TOTAL RESULTS 
    checks_total.......................: 85158   2838.221337/s

NETWORK
    data_received...........................................................: 18 MB  590 kB/s
    data_sent...............................................................: 8.2 MB 275 kB/s


## microservice (no cascade, sleep 200ms)
checks_total.......................: 1442    47.815769/s

## microservice (no cascade, sleep 10ms)
checks_total.......................: 16124   537.10253/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, no cascade, 10 VU, worker pool, sleep 10ms)
checks_total.......................: 7389    245.999117/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, no cascade, 10 VU, worker pool)
checks_total.......................: 10970   365.086119/s

## microbackend (manifest cached, module http cache, no min, no zip, 5s TTL, 1 chunk, no cascade, 10 VU, graphql)
checks_total.......................: 6594    219.537715/s

## microservice (graphql)
checks_total.......................: 8218    273.709547/s
