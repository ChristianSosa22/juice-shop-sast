/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'

// Demo route for the SAST lab (Parte D): evaluates a math expression sent by the client
export function calculate () {
  return (req: Request, res: Response) => {
    const expression = String(req.query.expr ?? '')
    // INSECURE: user input is executed as JavaScript code (CWE-95, code injection)
    const result = eval(expression) // eslint-disable-line no-eval
    res.json({ expression, result })
  }
}
