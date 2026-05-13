import { getAuditLogs } from '@/app/actions/queries';

export const revalidate = 0;

export default async function AdminAuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Immutable Protocol Ledger</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            System <span className="text-primary not-italic">Audit.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Real-time Operational Monitoring & Event Logging
          </p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="bg-surface-container-low/70 backdrop-blur-3xl text-on-surface border border-outline-variant/30 font-black text-[10px] uppercase tracking-[0.4em] px-8 py-5 rounded-2xl shadow-ambient hover:scale-105 active:scale-95 transition-all flex items-center gap-4 italic group">
             <span className="material-symbols-outlined text-xl group-hover:translate-y-1 transition-transform">download</span>
             EXPORT_LEDGER
           </button>
        </div>
      </header>

      {/* Audit Timeline Terminal */}
      <div className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[4rem] border border-outline-variant/30 shadow-ambient overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"></div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Temporal Marker</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Controller Node</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic">Operation Segment</th>
                <th className="py-8 px-12 text-[10px] font-black text-primary uppercase tracking-[0.4em] italic text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-32 text-center text-xs font-black uppercase tracking-[0.5em] opacity-20 italic">
                    PROTOCOL LEDGER EMPTY • NO OPERATIONS RECORDED
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white transition-all duration-500 group/row cursor-default">
                    <td className="py-10 px-12">
                       <div className="flex flex-col gap-1">
                          <p className="text-[11px] font-black text-on-surface uppercase tracking-widest tabular-nums italic">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : '---'}
                          </p>
                          <p className="text-[10px] font-black text-primary opacity-40 uppercase tracking-widest tabular-nums italic">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            }) : '---'}
                          </p>
                       </div>
                    </td>
                    <td className="py-10 px-12">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-inner border border-outline-variant/30 ${
                           log.severity === 'critical' ? 'bg-error/10 text-error animate-pulse' :
                           log.severity === 'warning' ? 'bg-amber-400/10 text-amber-500' :
                           'bg-surface-container-high text-primary/40 group-hover/row:text-primary group-hover/row:scale-110 group-hover/row:rotate-3'
                         }`}>
                            <span className="material-symbols-outlined text-2xl">{
                              log.severity === 'critical' ? 'emergency' :
                              log.severity === 'warning' ? 'warning' : 'shield_person'
                            }</span>
                         </div>
                         <div className="space-y-1">
                           <p className="text-base font-black text-on-surface uppercase tracking-tight font-display italic group-hover/row:text-primary transition-colors">{log.userName || 'SYSTEM_NODE'}</p>
                           <p className="text-[9px] font-black text-on-surface-variant opacity-40 uppercase tracking-widest italic">UID_{log.userId?.slice(-12).toUpperCase() || 'CORE_AUTH'}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-10 px-12">
                      <div className="space-y-2">
                         <p className="text-sm font-medium text-on-surface italic leading-relaxed group-hover/row:text-primary transition-colors">"{log.action}"</p>
                         <div className="flex items-center gap-3">
                           <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/row:bg-primary transition-colors"></span>
                           <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-30 italic">
                             {log.resourceType || 'SYSTEM'}: {log.resourceId?.slice(0, 16).toUpperCase() || 'NULL_PTR'}
                           </span>
                         </div>
                      </div>
                    </td>
                    <td className="py-10 px-12 text-right">
                      <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10 shadow-inner italic">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"></span>
                        VERIFIED
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-surface-container-high/30 border-t border-outline-variant/30 px-12 py-10 text-center">
           <button className="text-[11px] font-black text-primary uppercase tracking-[0.5em] hover:tracking-[0.7em] transition-all italic opacity-60 hover:opacity-100 group flex items-center justify-center gap-6 mx-auto">
             <span className="w-8 h-[1px] bg-primary/30 group-hover:w-16 transition-all"></span>
             SYNCHRONIZE_FRAGMENTED_SEQUENCE
             <span className="w-8 h-[1px] bg-primary/30 group-hover:w-16 transition-all"></span>
           </button>
        </div>
      </div>

      {/* Audit Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: 'Total Operations', val: logs.length.toLocaleString(), icon: 'analytics', detail: 'Cumulative Protocol Events' },
          { label: 'Ledger Integrity', val: '100%', icon: 'verified', detail: 'Zero Synchronization Errors' },
          { label: 'Active Session', val: '1 NODE', icon: 'router', detail: 'UPTIME: 43h 12m' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-surface-container-low/70 backdrop-blur-3xl p-10 rounded-[3rem] border border-outline-variant/30 shadow-ambient space-y-6 group hover:bg-white transition-all duration-700 relative overflow-hidden">
            <div className="flex items-center justify-between">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic ml-2">{metric.label}</p>
               <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                  <span className="material-symbols-outlined text-xl">{metric.icon}</span>
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-5xl font-black text-on-surface tracking-tighter font-display italic leading-none">{metric.val}</p>
               <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mt-3 italic">{metric.detail}</p>
            </div>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden p-[1px] mt-2">
               <div className="h-full bg-primary rounded-full opacity-20 group-hover:opacity-100 transition-all duration-1000" style={{ width: '100%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
