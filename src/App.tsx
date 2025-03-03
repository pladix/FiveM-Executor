import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Save, Trash2, Code, FileCode, Settings, Moon, Sun, Zap, Terminal, Shield, Database, Cpu } from 'lucide-react';

function App() {
  const [code, setCode] = useState<string>('-- Enter your Lua code here\n\nlocal player = GetPlayerPed(-1)\n\nRegisterCommand("heal", function()\n    SetEntityHealth(player, 200)\n    print("Player healed!")\nend, false)');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('editor');
  const [savedScripts, setSavedScripts] = useState<{name: string, code: string}[]>([
    { name: "Heal Player", code: 'local player = GetPlayerPed(-1)\nSetEntityHealth(player, 200)' },
    { name: "Spawn Vehicle", code: 'local model = "adder"\nRequestModel(model)\nwhile not HasModelLoaded(model) do\n  Wait(0)\nend\nlocal vehicle = CreateVehicle(model, GetEntityCoords(PlayerPedId()), GetEntityHeading(PlayerPedId()), true, false)\nSetPedIntoVehicle(PlayerPedId(), vehicle, -1)' }
  ]);
  const [randomChars, setRandomChars] = useState<string[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "> System initialized",
    "> FiveM connection established",
    "> Ready for code execution"
  ]);

  // Generate random matrix characters
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?";
    const interval = setInterval(() => {
      const newChars = [];
      for (let i = 0; i < 50; i++) {
        newChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
      }
      setRandomChars(newChars);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const executeCode = () => {
    // This would connect to FiveM in a real implementation
    console.log("Executing code:", code);
    
    // Add to console output
    setConsoleOutput(prev => [...prev, `> Executing script...`, `> ${code.split('\n')[0]}...`, `> Execution complete`]);
    
    // Show a notification
    const notification = document.getElementById('notification');
    if (notification) {
      notification.classList.remove('opacity-0');
      notification.classList.add('opacity-100');
      setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0');
      }, 3000);
    }
  };

  const saveCurrentScript = () => {
    const name = prompt("Enter a name for this script:");
    if (name) {
      setSavedScripts([...savedScripts, { name, code }]);
      setConsoleOutput(prev => [...prev, `> Script "${name}" saved successfully`]);
    }
  };

  const loadScript = (scriptCode: string) => {
    setCode(scriptCode);
    setIsMenuOpen(false);
    setConsoleOutput(prev => [...prev, `> Script loaded into editor`]);
  };

  const deleteScript = (index: number) => {
    const scriptName = savedScripts[index].name;
    const newScripts = [...savedScripts];
    newScripts.splice(index, 1);
    setSavedScripts(newScripts);
    setConsoleOutput(prev => [...prev, `> Script "${scriptName}" deleted`]);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#00ffaa] matrix-bg">
      <div className="scanline"></div>
      
      {/* Random matrix characters in background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5 z-0">
        {randomChars.map((char, i) => (
          <span 
            key={i} 
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: Math.random(),
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
              color: '#00ffaa'
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Header */}
      <header className="bg-[#0a0e17] border-b border-[#00ffaa33] relative z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-[#00ffaa] cyber-glow" />
            <h1 className="text-2xl font-bold tracking-wider glitch-text neon-text">PLADIX_EXECUTOR</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] cyber-button transition-all"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`p-2 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] cyber-button transition-all ${activeTab === 'settings' ? 'border-[#00ffaa]' : ''}`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Tabs */}
        <div className="flex border-b border-[#00ffaa33] mb-6 pb-2 space-x-6 font-medium">
          <button 
            onClick={() => setActiveTab('editor')} 
            className={`pb-2 transition-colors ${activeTab === 'editor' ? 'text-[#00ffaa] border-b-2 border-[#00ffaa] cyber-glow' : 'hover:text-[#00ffaa]'}`}
          >
            <div className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>EDITOR</span>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('scripts')} 
            className={`pb-2 transition-colors ${activeTab === 'scripts' ? 'text-[#00ffaa] border-b-2 border-[#00ffaa] cyber-glow' : 'hover:text-[#00ffaa]'}`}
          >
            <div className="flex items-center space-x-2">
              <FileCode className="h-4 w-4" />
              <span>SCRIPTS</span>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('console')} 
            className={`pb-2 transition-colors ${activeTab === 'console' ? 'text-[#00ffaa] border-b-2 border-[#00ffaa] cyber-glow' : 'hover:text-[#00ffaa]'}`}
          >
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4" />
              <span>CONSOLE</span>
            </div>
          </button>
        </div>

        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-[#0a0e17] rounded-sm overflow-hidden cyber-border">
              <div className="p-4 border-b border-[#00ffaa33] font-medium flex justify-between items-center">
                <span className="tracking-wider">SAVED_SCRIPTS</span>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 rounded hover:bg-[#00ffaa22] transition-colors"
                >
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 space-y-2">
                  {savedScripts.map((script, index) => (
                    <div key={index} className="p-3 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] transition-all flex justify-between items-center">
                      <button 
                        onClick={() => loadScript(script.code)}
                        className="text-sm font-medium truncate flex-1 text-left tracking-wider"
                      >
                        {script.name}
                      </button>
                      <button 
                        onClick={() => deleteScript(index)}
                        className="p-1 rounded hover:bg-[#ff000033] text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* System stats */}
              <div className="p-4 border-t border-[#00ffaa33]">
                <h3 className="text-sm font-medium mb-3 tracking-wider">SYSTEM_STATUS</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-3 w-3 text-green-400" />
                      <span>SECURITY</span>
                    </div>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Database className="h-3 w-3 text-[#00ffaa]" />
                      <span>MEMORY</span>
                    </div>
                    <span>86.2 MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-3 w-3 text-[#00ffaa]" />
                      <span>CPU</span>
                    </div>
                    <span>2.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="lg:col-span-3 flex flex-col">
              <div className="flex-1 rounded-sm overflow-hidden code-editor">
                <div className="p-3 border-b border-[#00ffaa33] font-medium tracking-wider flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>LUA_EXECUTOR</span>
                </div>
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[60vh] p-4 font-mono text-sm focus:outline-none resize-none bg-[#0a0e17] text-[#00ffaa] border-none"
                    spellCheck="false"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-[#00ffaa66]">
                    {code.split('\n').length} lines | {code.length} chars
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <button
                  onClick={saveCurrentScript}
                  className="px-4 py-2 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] flex items-center space-x-2 transition-all cyber-button"
                >
                  <Save className="h-4 w-4" />
                  <span className="tracking-wider">SAVE_SCRIPT</span>
                </button>
                
                <button
                  onClick={executeCode}
                  className="px-4 py-2 rounded-sm bg-[#00ffaa22] border border-[#00ffaa] hover:bg-[#00ffaa33] text-[#00ffaa] flex items-center space-x-2 transition-all cyber-button neon-border"
                >
                  <Play className="h-4 w-4" />
                  <span className="tracking-wider cyber-glow">EXECUTE</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scripts' && (
          <div className="rounded-sm bg-[#0a0e17] p-6 cyber-border">
            <h2 className="text-xl font-bold mb-4 tracking-wider neon-text">SAVED_SCRIPTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedScripts.map((script, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] transition-all flex flex-col"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium tracking-wider">{script.name}</h3>
                    <button 
                      onClick={() => deleteScript(index)}
                      className="p-1 rounded hover:bg-[#ff000033] text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <pre className="text-xs font-mono p-2 rounded bg-[#0a0e1799] border border-[#00ffaa22] overflow-x-auto mb-3 flex-1">
                    {script.code.length > 100 ? script.code.substring(0, 100) + '...' : script.code}
                  </pre>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setCode(script.code);
                        setActiveTab('editor');
                      }}
                      className="px-3 py-1 rounded-sm bg-[#00ffaa22] border border-[#00ffaa] hover:bg-[#00ffaa33] text-[#00ffaa] text-sm flex items-center space-x-1 cyber-button"
                    >
                      <Code className="h-3 w-3" />
                      <span className="tracking-wider">EDIT</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="rounded-sm bg-[#0a0e17] p-6 cyber-border">
            <h2 className="text-xl font-bold mb-4 tracking-wider flex items-center space-x-2 neon-text">
              <Terminal className="h-5 w-5" />
              <span>SYSTEM_CONSOLE</span>
            </h2>
            <div className="bg-black rounded-sm p-4 font-mono text-sm h-[60vh] overflow-y-auto">
              {consoleOutput.map((line, index) => (
                <div key={index} className={`mb-1 ${index === consoleOutput.length - 1 ? 'cursor-blink' : ''}`}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="rounded-sm bg-[#0a0e17] p-6 cyber-border">
            <h2 className="text-xl font-bold mb-4 tracking-wider neon-text">SYSTEM_SETTINGS</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-[#00ffaa33] rounded-sm">
                <span className="font-medium tracking-wider">INTERFACE_THEME</span>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-3 py-2 rounded-sm bg-[#0a0e17] border border-[#00ffaa33] hover:border-[#00ffaa] cyber-button"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span className="tracking-wider">LIGHT_MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span className="tracking-wider">DARK_MODE</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="border border-[#00ffaa33] rounded-sm p-4">
                <h3 className="font-medium mb-3 tracking-wider">ABOUT_PLADIXEXECUTOR</h3>
                <div className="space-y-2 text-sm text-[#00ffaa99]">
                  <p className="tracking-wider">
                    VERSION: 1.0.0_CYBERPUNK
                  </p>
                  <p className="tracking-wider">
                    BUILD: 20250615_SECURE
                  </p>
                  <p className="tracking-wider">
                    A professional Lua executor for FiveM with advanced security features and cyberpunk aesthetics.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#00ffaa33] rounded-sm p-4">
                <h3 className="font-medium mb-3 tracking-wider">SYSTEM_INFORMATION</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 border border-[#00ffaa22] rounded-sm">
                    <div className="text-[#00ffaa99] mb-1">CPU</div>
                    <div className="tracking-wider">INTEL i7-9700K</div>
                  </div>
                  <div className="p-2 border border-[#00ffaa22] rounded-sm">
                    <div className="text-[#00ffaa99] mb-1">RAM</div>
                    <div className="tracking-wider">16GB DDR4</div>
                  </div>
                  <div className="p-2 border border-[#00ffaa22] rounded-sm">
                    <div className="text-[#00ffaa99] mb-1">GPU</div>
                    <div className="tracking-wider">RTX 3070</div>
                  </div>
                  <div className="p-2 border border-[#00ffaa22] rounded-sm">
                    <div className="text-[#00ffaa99] mb-1">OS</div>
                    <div className="tracking-wider">WINDOWS 11</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification */}
      <div 
        id="notification" 
        className="fixed bottom-4 right-4 bg-[#00ffaa22] border border-[#00ffaa] text-[#00ffaa] px-4 py-2 rounded-sm shadow-lg opacity-0 transition-opacity duration-300 cyber-glow"
      >
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="tracking-wider">CODE EXECUTED SUCCESSFULLY</span>
        </div>
      </div>
    </div>
  );
}

export default App;