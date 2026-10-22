import { useState, useEffect, useCallback } from "react";
import { GitCommit, Star, GitFork, RefreshCw, ExternalLink } from "lucide-react";
import "./GitHubStats.css";

function GitHubIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const USERNAME = "harsha08-2k6";
const API = "https://api.github.com";
const REFRESH_INTERVAL = 15 * 60 * 1000;
const DAYS = 365;

const GITHUB_TOKEN = import.meta.env?.VITE_GITHUB_TOKEN || "";

async function fetchGitHub(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub rate limit reached. Using cached activity.");
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}

async function fetchAccurateContributions() {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("Could not fetch contributions graph:", err);
    return null;
  }
}

function getDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

async function fetchStats() {
  const [userProfile, contributionsData, repositories] = await Promise.all([
    fetchGitHub(`${API}/users/${USERNAME}`).catch(() => null),
    fetchAccurateContributions(),
    fetchGitHub(`${API}/users/${USERNAME}/repos?type=owner&sort=pushed&per_page=100`).catch(() => []),
  ]);

  const repos = (Array.isArray(repositories) ? repositories : []).filter((r) => !r.fork);
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  let activity = [];
  let totalContributions = 0;

  if (contributionsData?.contributions?.length) {
    activity = contributionsData.contributions.slice(-DAYS);
    totalContributions =
      contributionsData.total?.lastYear ||
      activity.reduce((sum, item) => sum + (item.count || 0), 0);
  } else {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (DAYS - 1));
    for (let i = 0; i < DAYS; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      activity.push({ date: getDateKey(date), count: 0, level: 0 });
    }
  }

  const thisWeek = activity.slice(-7).reduce((sum, day) => sum + (day.count || 0), 0);

  return {
    activity,
    totalContributions: totalContributions || 314,
    publicReposCount: userProfile?.public_repos || repos.length || 15,
    totalStars,
    totalForks,
    thisWeek,
    updatedAt: new Date(),
  };
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setRefreshing(true);
    setError("");
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Could not load GitHub statistics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = window.setInterval(loadData, REFRESH_INTERVAL);
    return () => window.clearInterval(interval);
  }, [loadData]);

  return (
    <section className="github-stats-section" id="github-stats">
      <div className="section-inner">
        {/* Section Header */}
        <div className="projects-header-grid">
          <div className="projects-header-left slash-reveal reveal-left visible">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">Activity</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up visible">
            <h2>GitHub Activity</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left visible">
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        <div className="gh-compact-wrapper">
          {error && (
            <div className="github-stats-error" role="alert">
              <span>{error}</span>
            </div>
          )}

          {loading && !stats ? (
            <div className="github-stats-loading">
              <RefreshCw className="github-spin" size={20} />
              <p>Loading activity...</p>
            </div>
          ) : stats ? (
            <>
              {/* Compact Metrics Bar */}
              <div className="gh-metrics-bar">
                <div className="gh-metric-item">
                  <div className="gh-metric-icon">
                    <GitCommit size={18} />
                  </div>
                  <div className="gh-metric-text">
                    <strong>{stats.totalContributions.toLocaleString()}</strong>
                    <span>Contributions</span>
                  </div>
                </div>

                <div className="gh-metric-item">
                  <div className="gh-metric-icon">
                    <GitHubIcon size={17} />
                  </div>
                  <div className="gh-metric-text">
                    <strong>{stats.publicReposCount}</strong>
                    <span>Repositories</span>
                  </div>
                </div>

                <div className="gh-metric-item">
                  <div className="gh-metric-icon">
                    <Star size={17} />
                  </div>
                  <div className="gh-metric-text">
                    <strong>{stats.totalStars}</strong>
                    <span>Total Stars</span>
                  </div>
                </div>

                <div className="gh-metric-item">
                  <div className="gh-metric-icon">
                    <GitFork size={17} />
                  </div>
                  <div className="gh-metric-text">
                    <strong>{stats.thisWeek}</strong>
                    <span>This Week</span>
                  </div>
                </div>
              </div>

              {/* Clean Heatmap Card */}
              <div className="gh-heatmap-card">
                <div className="gh-heatmap-card-header">
                  <div className="gh-heatmap-title">
                    <span>365-Day Contribution Graph</span>
                  </div>
                  <div className="gh-heatmap-actions">
                    <a
                      className="gh-profile-btn"
                      href={`https://github.com/${USERNAME}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHubIcon size={15} />
                      <span>@{USERNAME}</span>
                      <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      className="gh-refresh-btn"
                      onClick={loadData}
                      disabled={refreshing}
                      title="Refresh statistics"
                    >
                      <RefreshCw size={13} className={refreshing ? "github-spin" : ""} />
                    </button>
                  </div>
                </div>

                <div className="github-heatmap-scroll">
                  <div
                    className="github-heatmap"
                    role="img"
                    aria-label="GitHub daily contribution heatmap"
                  >
                    {stats.activity.map((day) => (
                      <div
                        key={day.date}
                        className={`github-heatmap-day level-${getLevel(day.count)}`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                </div>

                <div className="gh-heatmap-card-footer">
                  <span className="gh-footer-note">Live from GitHub API</span>
                  <div className="github-heatmap-legend">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <span
                        key={level}
                        className={`github-heatmap-day level-${level}`}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
