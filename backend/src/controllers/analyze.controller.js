const { cloneRepo, deleteRepo } = require("../services/git.service");
const simpleGit = require("simple-git");
const { calculateMetrics } = require("../services/metricsService");
const dayjs = require("dayjs");

exports.analyzeRepo = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({
      error: "Repository URL is required"
    });
  }

  let repoPath;

  try {
    // Clone repo
    repoPath = await cloneRepo(repoUrl);

    const git = simpleGit(repoPath);
    const log = await git.log({
  maxCount: 5000
});

    // Extract commits
   const commits = log.all.map(commit => ({
  author: commit.author_name,
  message: commit.message.toLowerCase(),
  date: dayjs(commit.date)
}));

    // Calculate metrics
    const metrics = calculateMetrics(commits);

    // Delete repo
    deleteRepo(repoPath);

    res.json(metrics);

  } catch (error) {

    if (repoPath) {
      deleteRepo(repoPath);
    }

    res.status(400).json({
      error: error.message
    });
  }
};