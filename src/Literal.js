// @flow
import React from 'react'

type Props = {
  content: string
}

const Literal = ({ content }: Props) =>
  <p>
    {content}
  </p>

module.exports = Literal
