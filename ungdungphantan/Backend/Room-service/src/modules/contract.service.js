import fs from "fs"
import path from "path"
import PDFDocument from "pdfkit"
import { PrismaClient } from "../generated/prisma/index.js"
const prisma = new PrismaClient();
