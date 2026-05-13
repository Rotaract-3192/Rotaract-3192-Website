import { getAuditLogs } from '@/app/actions/queries';

export const revalidate = 0;

export default async function AdminAuditPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none text-on-surface">System Audit</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">Immutable Protocol Ledger</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="bg-white text-on-surface border border-outline/10 font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl shadow-sm hover:scale-105 transition-all flex items-center gap-3">
             <span className="material-symbols-outlined text-base">download</span>
             Export Log
           </button>
        </div>
      </header>

      {/* Audit Timeline */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="py-6 px-10 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Temporal Marker</th>
                <th className="py-6 px-10 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Controller</th>
                <th className="py-6 px-10 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Operation Segment</th>
                <th className="py-6 px-10 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-xs font-bold uppercase tracking-[0.2em] opacity-30">
                    Protocol Ledger Empty. No operations recorded.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-primary/5 transition-all group">
                    <td className="py-8 px-10">
                      <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest italic">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '---'}
                      </p>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                           log.severity === 'critical' ? 'bg-red-50 text-red-500' :
                           log.severity === 'warning' ? 'bg-amber-50 text-amber-500' :
                           'bg-surface-container-low text-primary/40 group-hover:text-primary'
                         }`}>
                            <span className="material-symbols-outlined">{
                              log.severity === 'critical' ? 'emergency' :
                              log.severity === 'warning' ? 'warning' : 'shield_person'
                            }</span>
                         </div>
                         <div className="space-y-0.5">
                           <p className="text-sm font-black text-on-surface uppercase tracking-tight">{log.userName || 'System'}</p>
                           <p className="text-[8px] font-medium text-on-surface-variant opacity-40">UID: {log.userId?.slice(-8)}</p>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="space-y-1">
                         <p className="text-sm font-bold text-on-surface leading-none">{log.action}</p>
                         <div className="flex items-center gap-2">
                           <span className="text-[8px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">
                             {log.resourceType || 'SYSTEM'}: {log.resourceId?.slice(0, 12) || '---'}
                           </span>
                         </div>
                      </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Verified
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-surface-container-low/30 border-t border-outline/5 px-10 py-8 text-center">
           <button className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:tracking-[0.5em] transition-all italic opacity-60 hover:opacity-100">Synchronize Fragmented Sequence ↓</button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline/5 space-y-4">
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Total Operations</p>
           <p className="text-4xl font-black text-on-surface tracking-tighter">{logs.length.toLocaleString()}</p>
           <div className="h-1 w-full bg-white/50 rounded-full overflow-hidden">
             <div className="h-full bg-primary w-full opacity-20"></div>
           </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline/5 space-y-4">
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Ledger Integrity</p>
           <p className="text-4xl font-black text-on-surface tracking-tighter">100<span className="text-base opacity-30">%</span></p>
           <div className="flex items-center gap-2 text-green-600">
             <span className="material-symbols-outlined text-sm">check_circle</span>
             <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Nominal</span>
           </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline/5 space-y-4">
           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">Active Session</p>
           <p className="text-4xl font-black text-on-surface tracking-tighter">1<span className="text-base opacity-30"> NODE</span></p>
           <p className="text-[10px] font-bold text-on-surface-variant italic opacity-60">Uptime: 43h 12m</p>
        </div>
      </div>
    </div>
  );
}

