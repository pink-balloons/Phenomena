// Build an apiRouter using express Router
const express = require("express");
const apiRouter = express.Router();

// Import the database adapter functions from the db

const {
  client,
  createReport,
  getOpenReports,
  _getReport,
  closeReport,
  createReportComment,
} = require("../db");

apiRouter.get(" /reports", async (req, res, next) => {
  try {
    const theReports = await getOpenReports();
    const object = { reports: [] };
    if (theReports) {
      object.reports = theReports;
      res.send(obj);
    } else {
      next({
        name: "error",
        message: "theReports",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */

/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */
apiRouter.post("/reports", async (req, res, next) => {
  try {
    const report = await createReport(req.body);
    if (report) {
      res.send(report);
    } else {
      next({
        name: "error",
        message: "createReport",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

apiRouter.delete("/reports/:reportId", async (req, res, next) => {
  try {
    const reClose = await closeReport(req.params.reportId, req.body.password);
    if (reClose) {
      res.send(reClose);
    } else {
      next({
        name: "error",
        message: "closeReport",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

apiRouter.post("/reports/:reportId/comments", async (req, res, next) => {
  try {
    const comment = await createReportComment(req.params.reportId, req.body);
    if (comment) {
      res.send(comment);
    } else {
      next({
        name: "comment error",
        message: "problem with /api/reports/:id/comments",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

// Export the apiRouter
module.exports = apiRouter;
