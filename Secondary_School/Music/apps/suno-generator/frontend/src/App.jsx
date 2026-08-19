import { useState, useEffect } from "react";
import axios from "axios";
import { Settings, Music, Disc, Upload, Play, Pause, Save } from "lucide-react";
import { API_BASE_URL } from "./config";

function App() {
  const [activeTab, setActiveTab] = useState("generate");
  const [cookie, setCookie] = useState("");
  const [prompt, setPrompt] = useState("");
  const [instrumental, setInstrumental] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deploying, setDeploying] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
    fetchSongs();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/settings`);
      if (res.data.cookie) setCookie(res.data.cookie);
    } catch (err) {
      console.error(err);
    }
  };

  const saveSettings = async () => {
    try {
      await axios.post(`${API_BASE_URL}/settings`, { cookie });
      setMessage("Settings saved!");
      setTimeout(() => setMessage(""), 3000);
      fetchSongs();
    } catch (err) {
      setMessage("Error saving settings");
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/songs`);
      setSongs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateSong = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/generate`, {
        prompt,
        is_instrumental: instrumental,
      });
      setMessage("Generation started! Refresh library in a moment.");
      setPrompt("");
      setTimeout(() => fetchSongs(), 5000); // Poll after 5s
    } catch (err) {
      setMessage(
        "Generation failed: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const deploySong = async (song) => {
    setDeploying(song.id);
    try {
      await axios.post(`${API_BASE_URL}/deploy`, {
        audio_url: song.audio_url,
        title: song.title,
        id: song.id,
        created_at: song.created_at,
        lyrics: song.metadata?.prompt || "",
      });
      setMessage(`Deployed "${song.title}" to player!`);
    } catch (err) {
      setMessage("Deployment failed");
    } finally {
      setDeploying(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
            <Music className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text text-transparent">
            Suno Generator
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("settings")}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-slate-800 text-pink-400"
                : "hover:bg-slate-800"
            }`}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {message && (
          <div className="mb-6 p-4 bg-slate-800/80 border border-slate-700 rounded-xl text-center animate-fade-in text-pink-400">
            {message}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-pink-500" /> API Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Suno Cookie (sess-token/cookie string)
                  </label>
                  <textarea
                    value={cookie}
                    onChange={(e) => setCookie(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 h-32 text-xs font-mono focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                    placeholder="Paste your Suno cookie headers here..."
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Open Suno.com -&gt; F12 -&gt; Network -&gt; Refresh -&gt;
                    Click a request (e.g. 'me') -&gt; Copy 'Authorization' or
                    'Cookie'.
                  </p>
                </div>
                <button
                  onClick={saveSettings}
                  className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Credentials
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("generate")}
              className="mt-6 text-slate-400 hover:text-white flex items-center gap-2 mx-auto"
            >
              ← Back to Generator
            </button>
          </div>
        )}

        {activeTab !== "settings" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Generator Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 sticky top-28">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-pink-400">
                  <Disc /> Create New
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prompt
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 h-32 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                      placeholder="A cinematic orchestral epic about space exploration..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInstrumental(!instrumental)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        instrumental
                          ? "bg-pink-500/20 border-pink-500 text-pink-400"
                          : "bg-slate-900 border-slate-700 text-slate-400"
                      }`}
                    >
                      Instrumental
                    </button>
                  </div>

                  <button
                    onClick={generateSong}
                    disabled={loading || !prompt}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white shadow-lg shadow-pink-900/20 transition-all active:scale-95"
                  >
                    {loading ? "Generating..." : "Generate Song"}
                  </button>
                </div>
              </div>
            </div>

            {/* Library Panel */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Your Library</h2>
                <button
                  onClick={fetchSongs}
                  className="text-sm text-pink-400 hover:text-pink-300"
                >
                  Refresh List
                </button>
              </div>

              <div className="space-y-4">
                {songs.length === 0 && (
                  <div className="text-center py-20 text-slate-500 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                    No songs found. Create something new!
                  </div>
                )}

                {songs.map((song) => (
                  <div
                    key={song.id}
                    className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex gap-4 hover:border-slate-600 transition-colors group"
                  >
                    {/* Song Art */}
                    <div className="w-24 h-24 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img
                        src={song.image_url}
                        alt={song.title}
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/100x100/1e293b/475569?text=Music")
                        }
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="text-white fill-current" />
                      </div>
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3
                            className="font-bold text-lg truncate pr-4"
                            title={song.title || "Untitled"}
                          >
                            {song.title || "Untitled Song"}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              song.status === "complete"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {song.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-1">
                          {song.metadata?.tags}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(song.created_at).toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-3">
                        <audio
                          controls
                          src={song.audio_url}
                          className="h-8 flex-1 opacity-60 hover:opacity-100 transition-opacity"
                        />
                        <button
                          onClick={() => deploySong(song)}
                          disabled={
                            deploying === song.id || song.status !== "complete"
                          }
                          className="px-4 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                          {deploying === song.id ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <Upload size={14} />
                          )}
                          Deploy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
