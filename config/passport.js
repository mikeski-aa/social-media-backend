const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};
