/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'

const operations: Record<string, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}

// Demo route for the SAST lab (Parte D): evaluates a math expression sent by the client
export function calculate () {
  return (req: Request, res: Response) => {
    const expression = String(req.query.expr ?? '')
    // FIXED: no eval(); only "<number> <operator> <number>" is accepted and computed explicitly
    const match = /^\s*(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)\s*$/.exec(expression)
    if (match === null) {
      res.status(400).json({ error: 'Invalid expression' })
      return
    }
    const result = operations[match[2]](Number(match[1]), Number(match[3]))
    res.json({ expression, result })
  }
}
