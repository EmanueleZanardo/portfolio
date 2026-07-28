export default function SingularityPage() {
  return (
    <div className="w-full h-screen bg-[#030712] flex flex-col">
      <div className="p-4 bg-[#111827] border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-blue-400 font-mono text-lg font-bold">💠 Singularity Quant ETRM - Live Terminal</h1>
        <a 
          href="/" 
          className="text-sm font-mono text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded"
        >
          ← Torna al Portfolio
        </a>
      </div>
      <div className="flex-grow w-full">
        <iframe
          src="https://czpox8o8x6arnxw96txnvt.streamlit.app/?embed=true"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Singularity ETRM Dashboard"
        />
      </div>
    </div>
  );
}
