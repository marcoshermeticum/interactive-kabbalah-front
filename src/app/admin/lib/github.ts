/**
 * GitHub API integration for content management.
 * 
 * Reads and writes JSON translation files directly in the repository.
 * Each edit creates a commit, providing built-in version history and rollback.
 */

const GITHUB_TOKEN = process.env.GH_API_TOKEN || '';
const GITHUB_OWNER = process.env.GH_REPO_OWNER || '';
const GITHUB_REPO = process.env.GH_REPO_NAME || '';
const GITHUB_BRANCH = process.env.GH_REPO_BRANCH || 'main';

const API_BASE = 'https://api.github.com';

interface GitHubFileResponse {
  content: string;
  sha: string;
  encoding: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

function headers() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

/**
 * Get file content from GitHub
 */
export async function getFileContent(path: string): Promise<{ content: string; sha: string }> {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: GitHubFileResponse = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

/**
 * Update file content in GitHub (creates a commit)
 */
export async function updateFileContent(
  path: string,
  content: string,
  message: string,
  sha: string
): Promise<{ commitSha: string; commitUrl: string }> {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const encoded = Buffer.from(content, 'utf-8').toString('base64');

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`GitHub API error: ${res.status} — ${JSON.stringify(error)}`);
  }

  const data = await res.json();
  return {
    commitSha: data.commit.sha,
    commitUrl: data.commit.html_url,
  };
}

/**
 * Get commit history for a file
 */
export async function getFileHistory(path: string, perPage = 20): Promise<GitHubCommit[]> {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${path}&per_page=${perPage}&sha=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Get file content at a specific commit
 */
export async function getFileAtCommit(path: string, commitSha: string): Promise<string> {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${commitSha}`;
  const res = await fetch(url, { headers: headers(), cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: GitHubFileResponse = await res.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/**
 * Revert a file to a specific commit's version
 */
export async function revertToCommit(path: string, commitSha: string): Promise<{ commitSha: string; commitUrl: string }> {
  // Get the old content
  const oldContent = await getFileAtCommit(path, commitSha);
  // Get current SHA
  const { sha: currentSha } = await getFileContent(path);
  // Create a new commit reverting to old content
  return updateFileContent(
    path,
    oldContent,
    `Revert ${path} to commit ${commitSha.slice(0, 7)}`,
    currentSha
  );
}
