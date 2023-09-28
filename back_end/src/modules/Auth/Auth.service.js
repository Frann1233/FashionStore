import { prisma } from '../../main.js'
import * as bcrypt from 'bcrypt'

const saltRound = 10;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  const passwordCorrect = await bcrypt.compare(password, user.password)

  if (passwordCorrect) {
    return res.send(user)
  } else {
    return res.send('Wrong Password')
  }
}

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  res.send(user);
}

export default {
  login,
  register
}