from functools import reduce
from operator import mul
from os import environ

def getSolutionPart1():
    max = curr = 0
    with open('input.txt') as f:
        for c in f.readlines():
            if c.strip() == "":
                if curr > max:
                    max = curr
                curr = 0
            else: 
                curr += int(c.strip())
    return max


def getSolutionPart2():
    elves = []
    curr = 0
    with open('input.txt') as f:
        for c in f.readlines():
            if c.strip() == "":
                elves.append(curr)
                curr = 0
            else: 
                curr += int(c.strip())
    return sum(sorted(elves, reverse=True)[:3])



part = environ.get('part')

print(getSolutionPart2()) if part == "part2" else print(getSolutionPart1())
