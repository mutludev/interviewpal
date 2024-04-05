const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureSession } = require("./middleware");

router.get("/", ensureSession, async (req, res) => {
  res.send(req.user.jobs);
});

router.get("/:jobId", ensureSession, async (req, res) => {
  const job = req.user.jobs.find((job) => job._id.equals(req.params.jobId));
  if (!job) res.status(404).send("Job not found");
  res.send(job);
});

router.post("/", ensureSession, async (req, res) => {
  req.body._id = new mongoose.Types.ObjectId();
  req.user.jobs.push(req.body);
  try {
    await req.user.save();
  } catch (err) {
    const firstErrorMessage = err.errors[Object.keys(err.errors)[0]].message;
    return res.status(400).send(firstErrorMessage);
  }
  res.send(req.body);
});

router.put("/:jobId", ensureSession, async (req, res) => {
  const job = req.user.jobs.find((job) => job._id.equals(req.params.jobId));
  if (!job) return res.status(404).send("Job not found");
  Object.assign(job, req.body);
  try {
    await req.user.save();
  } catch (err) {
    const firstErrorMessage = err.errors[Object.keys(err.errors)[0]].message;
    return res.status(400).send(firstErrorMessage);
  }
  res.send(job);
});

router.delete("/:jobId", ensureSession, async (req, res) => {
  const job = req.user.jobs.find((job) => job._id.equals(req.params.jobId));
  if (!job) return res.status(404).send("Job not found");
  req.user.jobs = req.user.jobs.filter((job) => job._id != req.params.jobId);
  try {
    await req.user.save();
  } catch (err) {
    const firstErrorMessage = err.errors[Object.keys(err.errors)[0]].message;
    return res.status(400).send(firstErrorMessage);
  }
  res.send(job);
});

module.exports = router;
