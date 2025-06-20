#!/bin/bash
# Script to calculate Simple Interest

echo "Enter Principal:"
read p
echo "Enter Rate of interest:"
read r
echo "Enter Time (in years):"
read t

si=$(echo "scale=2; $p * $r * $t / 100" | bc)
echo "Simple Interest: $si"

