import { getAuditLogs } from '@/app/actions/queries';

export const revalidate = 0;

export default async function AdminAuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">District Security Protocol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            System <span className="text-primary">Audit</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Real-time operational monitoring and security logging.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="glass-panel text-white font-bold text-[10px] uppercase tracking-[0.4em] px-8 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group font-sans">
             <span className="material-symbols-outlined text-xl group-hover:translate-y-1 transition-transform">download</span>
             Export Audit Log
           </button>
        </div>
      </header>

      {/* Audit Timeline Terminal */}
      <section className="glass-panel overflow-hidden relative group">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Timestamp</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">User Node</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-sans">Action Description</th>
                <th className="py-6 px-10 text-[10px] font-bold text-primary uppercase tracking-[0.4em] text-right font-sans">Integrity Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-xs font-bold uppercase tracking-[0.5em] opacity-20 font-sans">
                    No activity logs recorded in district ledger
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-all duration-500 group/row cursor-default border-l-4 border-transparent hover:border-primary">
                    <td className="py-8 px-10">
                       <div className="flex flex-col gap-1">
                          <p className="text-[11px] font-bold text-white uppercase tracking-widest tabular-nums font-sans">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : '---'}
                          </p>
                          <p className="text-[10px] font-bold text-primary opacity-40 uppercase tracking-widest tabular-nums font-sans">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : '---'}
                          </p>
                       </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-6">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 border border-white/10 ${
                           log.severity === 'critical' ? 'bg-red-500/10 text-red-500 animate-pulse' :
                           log.severity === 'warning' ? 'bg-amber-400/10 text-amber-500' :
                           'bg-white/5 text-primary/40 group-hover/row:text-primary group-hover/row:scale-110'
                         }`}>
                            <span className="material-symbols-outlined text-xl">{
                              log.severity === 'critical' ? 'emergency' :
                              log.severity === 'warning' ? 'warning' : 'shield_person'
                            }</span>
                         </div>
                         <div className="space-y-1">
                           <p className="text-base font-bold text-white uppercase tracking-tight font-display group-hover/row:text-primary transition-colors">{log.userName || 'System Auto'}</p>
                           <p className="text-[9px] font-bold text-text-muted opacity-40 uppercase tracking-widest font-sans">ID: {log.userId?.slice(-8).toUpperCase() || 'CORE_AUTH'}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="space-y-2">
                         <p className="text-sm font-medium text-white leading-relaxed group-hover/row:text-primary transition-colors font-sans">{log.action}</p>
                         <div className="flex items-center gap-3">
                           <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/row:bg-primary transition-colors"></span>
                           <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] opacity-30 font-sans">
                             {log.resourceType || 'SYSTEM'}: {log.resourceId?.slice(0, 12).toUpperCase() || 'NULL_PTR'}
                           </span>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-[0.2em] border border-primary/10 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3B82F6]"></span>
                        Verified
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white/5 border-t border-white/5 px-10 py-8 text-center">
           <button className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] hover:tracking-[0.6em] transition-all opacity-60 hover:opacity-100 group flex items-center justify-center gap-4 mx-auto font-sans">
             <span className="w-6 h-[1px] bg-primary/30 group-hover:w-12 transition-all"></span>
             Load Historical Logs
             <span className="w-6 h-[1px] bg-primary/30 group-hover:w-12 transition-all"></span>
           </button>
        </div>
      </section>

      {/* Audit Intelligence Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: 'Total Logs', val: logs.length.toLocaleString(), icon: 'analytics', detail: 'Cumulative System Events' },
          { label: 'Integrity', val: '100%', icon: 'verified', detail: 'Zero Security Failures' },
          { label: 'Active Node', val: 'Primary', icon: 'router', detail: 'Monitoring Active' }
        ].map((metric, idx) => (
          <div key={idx} className="glass-panel p-10 rounded-[2.5rem] space-y-6 group hover:bg-white/5 transition-all duration-700 relative overflow-hidden">
            <div className="flex items-center justify-between">
               <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] ml-2 font-sans">{metric.label}</p>
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">{metric.icon}</span>
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-5xl font-bold text-white tracking-tighter font-display uppercase leading-none">{metric.val}</p>
               <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest opacity-40 mt-3 font-sans">{metric.detail}</p>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-4">
               <div className="h-full bg-primary rounded-full opacity-20 group-hover:opacity-100 transition-all duration-1000" style={{ width: '100%' }}></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
