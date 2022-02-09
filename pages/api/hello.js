import dbConnect from '../../lib/dbConnect'
import Movie from '../../models/Movie'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const movies = await Movie.find({}).limit(20) /* find all the data in our database */
        res.status(200).json(movies)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const movie = await Movie.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: movie })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
