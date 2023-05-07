// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  jwt: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ jwt: 'token' })
}


// app.post('/api/login', (req, res) => {
//   const token = 'fake token string' //token 을 만들어 넣어준다
//   res.setHeader('Set-Cookie', token) // token 을 cookie 값에 넣는다
//   res.status(200).json({ user: mockUser })
// })