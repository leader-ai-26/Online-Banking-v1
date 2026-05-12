import { useState } from "react";

const T = {
  red:'#333333', redHover:'#111111', redBg:'rgba(0,0,0,0.05)',
  bg:'#F2F2F2', surface:'#FFFFFF', border:'#CCCCCC', borderLight:'#E0E0E0',
  text:'#222222', muted:'#666666', light:'#999999',
  success:'#444444', successBg:'#EBEBEB', successBorder:'#AAAAAA',
  warning:'#555555', warningBg:'#EFEFEF',
};
const font = "'DM Sans',-apple-system,sans-serif";

const Btn = ({ children, onClick, variant='primary', size='md', disabled, fullWidth }) => {
  const [hov,setHov]=useState(false);
  const base={display:'inline-flex',alignItems:'center',gap:7,justifyContent:'center',fontFamily:font,fontWeight:500,cursor:disabled?'not-allowed':'pointer',border:'1px solid #AAAAAA',borderRadius:2,transition:'none',width:fullWidth?'100%':'auto',opacity:disabled?0.4:1,fontSize:size==='sm'?13:size==='lg'?15:14,padding:size==='sm'?'6px 14px':size==='lg'?'13px 28px':'9px 20px',whiteSpace:'nowrap'};
  const vs={primary:{background:hov?'#111':'#333',color:'#fff',border:'1px solid #222'},secondary:{background:'#fff',color:T.text,border:'1px solid #AAAAAA'},ghost:{background:'transparent',color:hov?T.text:T.muted,border:'none'}};
  return <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...base,...(vs[variant]||vs.primary)}}>{children}</button>;
};

const LBField = ({ label, required, hint, children }) => (
  <div style={{marginBottom:18}}>
    {label&&<label style={{display:'block',fontSize:13,fontWeight:500,color:T.text,marginBottom:5}}>{label}{required&&<span style={{color:T.red}}> *</span>}</label>}
    {children}
    {hint&&<p style={{fontSize:12,color:T.light,margin:'4px 0 0'}}>{hint}</p>}
  </div>
);

const LBInput = ({ value, onChange, type='text', placeholder, prefix }) => {
  const [foc,setFoc]=useState(false);
  return(
    <div style={{display:'flex',alignItems:'center',border:`1.5px solid ${foc?T.red:T.border}`,borderRadius:8,background:'#fff',overflow:'hidden'}}>
      {prefix&&<span style={{padding:'0 12px',color:T.muted,fontSize:13,borderRight:`1px solid ${T.border}`,whiteSpace:'nowrap'}}>{prefix}</span>}
      <input type={type} value={value||''} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} style={{border:'none',outline:'none',background:'transparent',padding:'9px 13px',fontSize:14,color:T.text,width:'100%',fontFamily:font}} />
    </div>
  );
};

const LBTextarea = ({ value, onChange, placeholder, rows=3 }) => {
  const [foc,setFoc]=useState(false);
  return <textarea value={value||''} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} rows={rows} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} style={{width:'100%',border:`1.5px solid ${foc?T.red:T.border}`,borderRadius:8,padding:'9px 13px',fontSize:14,color:T.text,fontFamily:font,resize:'vertical',outline:'none',background:'#fff',boxSizing:'border-box'}} />;
};

const LBSelect = ({ value, onChange, options, placeholder }) => {
  const [foc,setFoc]=useState(false);
  return(
    <select value={value||''} onChange={e=>onChange&&onChange(e.target.value)} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
      style={{width:'100%',border:`1.5px solid ${foc?T.red:T.border}`,borderRadius:8,padding:'9px 36px 9px 13px',fontSize:14,color:value?T.text:T.light,background:'#fff',outline:'none',fontFamily:font,cursor:'pointer',appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 13px center',boxSizing:'border-box'}}>
      {placeholder&&<option value="">{placeholder}</option>}
      {options.map(o=>typeof o==='string'?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
};

const Badge = ({ children, variant='default' }) => {
  const vs={default:{bg:'#EBEBEB',color:'#555'},success:{bg:'#EBEBEB',color:'#333'},info:{bg:'#E8E8E8',color:'#444'},brand:{bg:'#E2E2E2',color:'#222'}};
  const s=vs[variant]||vs.default;
  return <span style={{display:'inline-flex',alignItems:'center',padding:'3px 10px',borderRadius:99,fontSize:12,fontWeight:500,background:s.bg,color:s.color,whiteSpace:'nowrap'}}>{children}</span>;
};

const Card = ({ children, style }) => <div style={{background:'#fff',borderRadius:4,border:`1px solid #CCCCCC`,...style}}>{children}</div>;

const CBRow = ({ checked, onChange, label, sublabel }) => (
  <label style={{display:'flex',gap:11,cursor:'pointer',alignItems:'flex-start'}} onClick={onChange}>
    <div style={{width:18,height:18,minWidth:18,borderRadius:4,marginTop:1,border:`2px solid ${checked?T.red:T.border}`,background:checked?T.red:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
      {checked&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5 5.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <div>{label&&<div style={{fontSize:14,fontWeight:500,color:T.text,lineHeight:1.4}}>{label}</div>}{sublabel&&<div style={{fontSize:12,color:T.muted,marginTop:2,lineHeight:1.5}}>{sublabel}</div>}</div>
  </label>
);

const InfoBanner = ({ children, variant='info' }) => {
  const cs={info:{bg:'#EFEFEF',border:'#CCCCCC',color:'#444'},warning:{bg:'#EBEBEB',border:'#BBBBBB',color:'#444'}};
  const c=cs[variant]||cs.info;
  return <div style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:8,padding:'11px 14px',fontSize:13,color:c.color,marginBottom:20,lineHeight:1.5}}>{children}</div>;
};

const Modal = ({ open, onClose, title, children, width=480 }) => {
  if(!open) return null;
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(28,25,23,0.55)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'#fff',borderRadius:4,padding:28,width,maxWidth:'100%',maxHeight:'90vh',overflowY:'auto',border:'1px solid #BBBBBB'}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontSize:18,fontWeight:700,color:T.text,margin:0}}>{title}</h2>
          <button onClick={onClose} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:T.muted,fontSize:22,lineHeight:1,padding:4}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Grid2 = ({ children, gap=16 }) => <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap}}>{children}</div>;

const Tooltip = ({ text, children, dir='right' }) => {
  const [show,setShow]=useState(false);
  const tipBase={background:'#1C1917',color:'#fff',borderRadius:8,padding:'9px 13px',fontSize:12,lineHeight:1.55,zIndex:100,pointerEvents:'none',boxShadow:'0 4px 16px rgba(0,0,0,0.25)',position:'absolute'};
  const tipPos=dir==='bottom'?{...tipBase,left:0,top:'calc(100% + 8px)',width:300}:{...tipBase,left:'100%',top:'50%',transform:'translateY(-50%)',marginLeft:10,width:240};
  return(
    <span style={{position:'relative',display:'inline-flex',alignItems:'center',gap:5}}>
      {children}
      <span onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} onClick={e=>e.stopPropagation()} style={{width:15,height:15,borderRadius:'50%',background:T.border,display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'help',flexShrink:0,fontSize:9,fontWeight:700,color:T.muted}}>?</span>
      {show&&<span style={tipPos}>{text}{dir==='right'&&<span style={{position:'absolute',right:'100%',top:'50%',transform:'translateY(-50%)',borderWidth:5,borderStyle:'solid',borderColor:`transparent #1C1917 transparent transparent`}} />}</span>}
    </span>
  );
};



const INTL_FREQ_OPTIONS=['Never','Daily','Weekly','Monthly','Quarterly','Annually','Occasionally'];
const DOMESTIC_ONLY_FREQS=['Never','Annually','Occasionally'];
const COLL_AMOUNT_OPTIONS=['$0 – $25,000','$25,001 – $100,000','$100,001 – $500,000','$500,000+'];
const ACCESS_ROLES=[
  {v:'admin',  l:'Senior Admin / Full Access'},
  {v:'limited',l:'Limited Access (please specify)'},
  {v:'view',   l:'View Only'},
  {v:'deposit',l:'Deposit Only'},
  {v:'none',   l:'No Access'},
];

const MOCK_FD = {
  primaryFirstName:'Daniella', primaryLastName:'Rivera',
  primaryPersonalEmail:'daniella@cuetees.com',
  primaryPhone:'+1|6175550199',
  businessName:'CueTees LLC',
  rmName:'John Smith',
  address:{street:'142 Elm Street',city:'Boston',state:'MA',zip:'02101'},
  signers:[{id:'101',firstName:'Linh',lastName:'Tran',email:'linh@cuetees.com',phone:'6175550122'}],
  accounts:[
    {id:'acct1',type:'Business Checking',number:'••••4521'},
    {id:'acct2',type:'Business Savings',number:'••••8834'},
  ],
};

// ── Step 1 ────────────────────────────────────────────────────────
const OLBStep1 = ({olb, setOlb}) => {
  const svc=olb.services||{};
  const upd=(k,v)=>setOlb(o=>({...o,services:{...(o.services||{}),[k]:v}}));
  const isDomesticOnly=svc.wires!==false&&svc.wiresIntlFreq&&DOMESTIC_ONLY_FREQS.includes(svc.wiresIntlFreq);
  const showCollAmount=!!svc.ach&&!!svc.achCollection;
  const allAcctIds=(MOCK_FD.accounts||[]).map(a=>a.id);

  const AccountPicker=({svcKey})=>{
    const selected=svc[svcKey+'Accounts']||[];
    const toggle=id=>{const next=selected.includes(id)?selected.filter(x=>x!==id):[...selected,id];upd(svcKey+'Accounts',next);};
    return(
      <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.borderLight}`}}>
        <div style={{fontSize:13,fontWeight:500,color:T.text,marginBottom:8}}>Applicable Accounts</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {(MOCK_FD.accounts||[]).map(acct=>{
            const checked=selected.includes(acct.id);
            return(
              <div key={acct.id} style={{padding:'10px 14px',background:T.bg,borderRadius:8,border:`1px solid ${checked?T.successBorder:T.border}`}}>
                <CBRow checked={checked} onChange={()=>toggle(acct.id)} label={acct.type} sublabel={acct.number} />
              </div>
            );
          })}
        </div>
        {selected.length===0&&<p style={{fontSize:12,color:'#B45309',margin:'8px 0 0'}}>At least one account must be selected.</p>}
      </div>
    );
  };

  const DualAuth=({dualKey,approvalsKey,tip})=>(
    <div style={{marginBottom:4}}>
      <div style={{fontSize:13,fontWeight:500,color:T.text,marginBottom:8}}><Tooltip text={tip} dir="bottom">Does your company require dual authorization to initiate this transaction?</Tooltip></div>
      <div style={{display:'flex',gap:6,marginBottom:svc[dualKey]===true?14:0}}>
        {[['Yes',true],['No',false]].map(([lbl,val])=>{const sel=svc[dualKey]===val;return <button key={lbl} onClick={()=>upd(dualKey,val)} style={{padding:'6px 20px',borderRadius:7,border:`1.5px solid ${sel?T.red:T.border}`,background:sel?T.redBg:'#fff',color:sel?T.red:T.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:font}}>{lbl}</button>;})}
      </div>
      {svc[dualKey]===true&&<LBField label="How many approvals are needed?"><LBSelect value={svc[approvalsKey]||''} onChange={v=>upd(approvalsKey,v)} placeholder="Select…" options={['1','2','3','4','5']} /></LBField>}
    </div>
  );

  const SvcBox=({svcKey,defaultOn=false,children,label,sublabel,noAccounts=false})=>{
    const checked=defaultOn?true:!!svc[svcKey];
    const toggle=()=>{if(!defaultOn)upd(svcKey,svc[svcKey]===false?true:!svc[svcKey]);};
    return(
      <Card style={{padding:'16px 20px',marginBottom:10,border:`1px solid ${checked&&!defaultOn?T.red:T.border}`,background:checked&&!defaultOn?T.redBg:'#fff'}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
          {!defaultOn&&<div onClick={toggle} style={{width:18,height:18,minWidth:18,borderRadius:4,marginTop:1,border:`2px solid ${checked?T.red:T.border}`,background:checked?T.red:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>{checked&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5 5.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>}
          <div style={{flex:1,cursor:defaultOn?'default':'pointer'}} onClick={defaultOn?undefined:toggle}><div style={{fontSize:14,fontWeight:600,color:T.text}}>{label}</div>{sublabel&&<div style={{fontSize:12,color:T.muted,marginTop:3}}>{sublabel}</div>}</div>
        </div>
        {checked&&!defaultOn&&(children||!noAccounts)&&<div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.borderLight}`}}>{children}{!noAccounts&&<AccountPicker svcKey={svcKey} />}</div>}
      </Card>
    );
  };

  return(
    <div>
      <h2 style={{fontSize:22,fontWeight:800,color:T.text,margin:'0 0 6px',letterSpacing:'-0.03em'}}>Company Services</h2>
      <p style={{fontSize:14,color:T.muted,margin:'0 0 20px',lineHeight:1.6}}>Your company's profile will have the following services enabled by default. Please select any additional services your business needs below.</p>
      <Card style={{padding:18,marginBottom:24}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:12}}>Enabled by Default</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>{['Account Viewing','Internal Transfer','Bill Payment','Mobile Deposit','Statement Viewing'].map(s=><span key={s} style={{fontSize:13,fontWeight:500,color:T.text,background:T.bg,border:`1px solid ${T.border}`,padding:'5px 12px',borderRadius:99}}>{s}</span>)}</div>
      </Card>

      <Card style={{padding:'16px 20px',marginBottom:10,border:`1px solid ${svc.wires!==false?T.red:T.border}`,background:svc.wires!==false?T.redBg:'#fff'}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
          <div onClick={()=>upd('wires',svc.wires===false?undefined:false)} style={{width:18,height:18,minWidth:18,borderRadius:4,marginTop:1,border:`2px solid ${svc.wires!==false?T.red:T.border}`,background:svc.wires!==false?T.red:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>{svc.wires!==false&&<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5 5.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
          <div style={{flex:1,cursor:'pointer'}} onClick={()=>upd('wires',svc.wires===false?undefined:false)}><div style={{fontSize:14,fontWeight:600,color:T.text}}>Online Wire Transfers</div></div>
        </div>
        {svc.wires!==false&&(
          <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.borderLight}`}}>
            <div style={{marginBottom:16}}><DualAuth dualKey="wiresDualAuth" approvalsKey="wiresApprovals" tip="Dual authorization requires one user to initiate a wire and a separate user to approve it before it is sent. This adds an important security layer over outgoing transfers." /></div>

            <AccountPicker svcKey="wires" />
          </div>
        )}
      </Card>

      <SvcBox svcKey="ach" label={<Tooltip text="ACH Origination allows your business to electronically initiate credit (payment) or debit (collection) transactions through the Automated Clearing House network." dir="bottom">ACH Origination</Tooltip>}>
        <LBField label="What types of transfers does your business need?" required>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <div style={{padding:'12px 14px',borderRadius:8,border:`1px solid ${svc.achPayments?T.successBorder:T.border}`,background:T.bg}}>
              <CBRow checked={!!svc.achPayments} onChange={()=>upd('achPayments',!svc.achPayments)} label="ACH Payments" sublabel="Send payments to vendors, employees, or others" />
            </div>
            <div style={{padding:'12px 14px',borderRadius:8,border:`1px solid ${svc.achCollection?T.successBorder:T.border}`,background:T.bg}}>
              <CBRow checked={!!svc.achCollection} onChange={()=>upd('achCollection',!svc.achCollection)} label="ACH Collection" sublabel="Collect payments from customers or clients" />
            </div>
          </div>
          {!svc.achPayments&&!svc.achCollection&&<p style={{fontSize:12,color:'#B45309',margin:'6px 0 0'}}>At least one option must be selected.</p>}
        </LBField>
        {svc.achPayments&&(
          <LBField label="Will your company need to initiate payroll transactions?">
            <div style={{display:'flex',gap:6}}>
              {[['Yes',true],['No',false]].map(([lbl,val])=>{const sel=svc.achPayroll===val;return <button key={lbl} onClick={()=>upd('achPayroll',val)} style={{padding:'6px 20px',borderRadius:7,border:`1.5px solid ${sel?T.red:T.border}`,background:sel?T.redBg:'#fff',color:sel?T.red:T.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:font}}>{lbl}</button>;})}
            </div>
          </LBField>
        )}
        {showCollAmount&&<LBField label="Anticipated monthly amount needed to collect" required><LBInput value={svc.achCollectionAmount||''} onChange={v=>upd('achCollectionAmount',v)} placeholder="e.g. 50,000" prefix="$" /></LBField>}
        {(svc.achPayments||svc.achCollection)&&<LBField label="Additional details" hint="Optional"><LBTextarea value={svc.achNotes||''} onChange={v=>upd('achNotes',v)} placeholder="Any other information about your ACH needs…" rows={2} /></LBField>}
        <DualAuth dualKey="achDualAuth" approvalsKey="achApprovals" tip="Dual authorization requires one user to initiate an ACH transaction and a separate user to approve it before processing. This control helps prevent unauthorized or fraudulent transfers." />
      </SvcBox>

      <SvcBox svcKey="positivePay" label={<Tooltip text="Positive Pay is a fraud prevention service that matches checks issued by your company against checks presented for payment. Discrepancies are flagged for your review before the check is paid." dir="bottom">Positive Pay</Tooltip>} sublabel="Fees may apply.">
        <LBField label="Would you like to set up an SFTP transmission to import your check files?">
          <div style={{display:'flex',gap:6,marginBottom:svc.positivePaySftp!==undefined?12:0}}>
            {[['Yes',true],['No',false]].map(([lbl,val])=>{const sel=svc.positivePaySftp===val;return <button key={lbl} onClick={()=>upd('positivePaySftp',val)} style={{padding:'6px 20px',borderRadius:7,border:`1.5px solid ${sel?T.red:T.border}`,background:sel?T.redBg:'#fff',color:sel?T.red:T.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:font}}>{lbl}</button>;})}
          </div>
          {svc.positivePaySftp===true&&<InfoBanner>We will contact you to establish the SFTP connection. In the meantime, you will be able to use the Manual File Import option until the SFTP connection is established.</InfoBanner>}
          {svc.positivePaySftp===false&&<InfoBanner>No problem. You will have the ability to import your check files manually. Otherwise, if no files are imported, all checks will be prompted as an exception.</InfoBanner>}
        </LBField>
        <LBField label="Sample Check File" hint="Optional — upload a sample check file to help set up your Positive Pay profile. You can also do this at a later point in time, but it is required to be able to import files in the future.">
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <label style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:7,border:`1.5px solid ${T.border}`,background:'#fff',cursor:'pointer',fontSize:13,fontWeight:500,color:T.text}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 4l3-3 3 3M2 11h10" stroke={T.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {svc.positivePaySampleFile?'Change File':'Choose File'}
              <input type="file" accept=".csv,.txt,.pdf,.xlsx" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)upd('positivePaySampleFile',{name:f.name,size:f.size});}} />
            </label>
            {svc.positivePaySampleFile&&<div style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:T.muted}}><span>📄</span>{svc.positivePaySampleFile.name}<button onClick={()=>upd('positivePaySampleFile',null)} style={{background:'none',border:'none',cursor:'pointer',color:T.light,fontSize:16,lineHeight:1,padding:'0 2px'}}>×</button></div>}
          </div>
        </LBField>
      </SvcBox>
      <SvcBox svcKey="remoteDeposit" label={<Tooltip text="Remote Deposit Capture lets your business deposit checks electronically using a desktop scanner, without visiting a branch. A compatible scanner is required." dir="bottom">Remote Deposit Scanner</Tooltip>} sublabel="Fees may apply.">
        <LBField label="Where should we ship your scanner?">
          <div style={{padding:'12px 14px',background:T.bg,borderRadius:8,border:`1px solid ${T.border}`,marginBottom:8}}>
            <div style={{fontSize:12,fontWeight:600,color:T.muted,marginBottom:4}}>Address on File</div>
            <div style={{fontSize:13,color:T.text}}>{MOCK_FD.address.street}</div>
            <div style={{fontSize:13,color:T.text}}>{MOCK_FD.address.city}, {MOCK_FD.address.state} {MOCK_FD.address.zip}</div>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:svc.remoteDepositSameAddress!==undefined?14:0}}>
            {[['Ship here',true],['Use a different address',false]].map(([lbl,val])=>{const sel=svc.remoteDepositSameAddress===val;return <button key={lbl} onClick={()=>upd('remoteDepositSameAddress',val)} style={{padding:'6px 20px',borderRadius:7,border:`1.5px solid ${sel?T.red:T.border}`,background:sel?T.redBg:'#fff',color:sel?T.red:T.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:font,whiteSpace:'nowrap'}}>{lbl}</button>;})}
          </div>
          {svc.remoteDepositSameAddress===false&&(
            <div style={{marginTop:4}}>
              <LBField label="Street Address"><LBInput value={svc.remoteDepositAddress?.street||''} onChange={v=>upd('remoteDepositAddress',{...(svc.remoteDepositAddress||{}),street:v})} placeholder="123 Main Street" /></LBField>
              <Grid2>
                <LBField label="City"><LBInput value={svc.remoteDepositAddress?.city||''} onChange={v=>upd('remoteDepositAddress',{...(svc.remoteDepositAddress||{}),city:v})} placeholder="City" /></LBField>
                <LBField label="State"><LBInput value={svc.remoteDepositAddress?.state||''} onChange={v=>upd('remoteDepositAddress',{...(svc.remoteDepositAddress||{}),state:v})} placeholder="State" /></LBField>
              </Grid2>
              <LBField label="ZIP Code"><LBInput value={svc.remoteDepositAddress?.zip||''} onChange={v=>upd('remoteDepositAddress',{...(svc.remoteDepositAddress||{}),zip:v})} placeholder="ZIP" /></LBField>
            </div>
          )}
        </LBField>
        <InfoBanner>Once you receive your scanner, please set up a time with your Relationship Manager to install the necessary software to activate your scanner.</InfoBanner>
      </SvcBox>
      <SvcBox svcKey="zelle" label={<Tooltip text="Zelle for Small Business lets eligible businesses send and receive money quickly using just an email address or US mobile number. Subject to eligibility requirements." dir="bottom">Zelle for Small Business</Tooltip>} sublabel="Eligibility may apply. Fees may apply." noAccounts />
    </div>
  );
};

// ── Step 2: Combined Authorized User Setup ────────────────────────
const OLBStep2 = ({olb, setOlb}) => {
  const [showAdd,setShowAdd]=useState(false);
  const [nu,setNu]=useState({firstName:'',lastName:'',email:'',phone:''});
  const users=olb.users||[];
  const svc=olb.services||{};
  const access=olb.userAccess||{};

  const removeUser=id=>setOlb(o=>({...o,users:(o.users||[]).filter(u=>u.id!==id)}));
  const addUser=()=>{setOlb(o=>({...o,users:[...(o.users||[]),{...nu,id:'new_'+Date.now(),hasAccess:true}]}));setNu({firstName:'',lastName:'',email:'',phone:''});setShowAdd(false);};

  const defaultLimits={wires:true,wiresLimit:'',ach:true,achLimit:'',positivePay:true,remoteDeposit:true,zelle:true,internalTransfer:true,billPayment:true,mobileDeposit:true,statementViewing:true};
  const setUserRole=(uid,role)=>setOlb(o=>({...o,userAccess:{...(o.userAccess||{}),[uid]:{role,accounts:role==='none'?[]:(o.userAccess?.[uid]?.accounts||allAcctIds),limits:(o.userAccess?.[uid]?.limits)||defaultLimits}}}));
  const setLimit=(uid,key,val)=>setOlb(o=>({...o,userAccess:{...(o.userAccess||{}),[uid]:{...(o.userAccess?.[uid]||{role:'limited'}),limits:{...(o.userAccess?.[uid]?.limits||{}),[key]:val}}}}));
  const allAcctIds=(MOCK_FD.accounts||[]).map(a=>a.id);
  const toggleAccount=(uid,acctId)=>setOlb(o=>{
    const cur=o.userAccess?.[uid]?.accounts||allAcctIds;
    const next=cur.includes(acctId)?cur.filter(id=>id!==acctId):[...cur,acctId];
    return{...o,userAccess:{...(o.userAccess||{}),[uid]:{...(o.userAccess?.[uid]||{}),accounts:next}}};
  });

  const addlSvcs=[
    svc.wires!==false&&{key:'wires',label:'Wire Transfers',hasLimit:true,limitLabel:'Wire limit per transaction'},
    svc.ach&&{key:'ach',label:'ACH Origination',hasLimit:true,limitLabel:'ACH limit per transaction'},
    svc.positivePay&&{key:'positivePay',label:'Positive Pay',hasLimit:false},
    svc.remoteDeposit&&{key:'remoteDeposit',label:'Remote Deposit Scanner',hasLimit:false},
    svc.zelle&&{key:'zelle',label:'Zelle for Small Business',hasLimit:false},
  ].filter(Boolean);
  const defaultSvcs=[{key:'internalTransfer',label:'Internal Transfer'},{key:'billPayment',label:'Bill Payment'},{key:'mobileDeposit',label:'Mobile Deposit'},{key:'statementViewing',label:'Statement Viewing'}];

  return(
    <div>
      <h2 style={{fontSize:22,fontWeight:800,color:T.text,margin:'0 0 6px',letterSpacing:'-0.03em'}}>Authorized User Setup</h2>
      <p style={{fontSize:14,color:T.muted,margin:'0 0 20px',lineHeight:1.6}}>Set each user's access level, account access, and add any additional users your business needs.</p>

      <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:16}}>
        {users.map(u=>{
          const initials=`${(u.firstName||'')[0]||''}${(u.lastName||'')[0]||''}`.toUpperCase();
          const ua=access[u.id]||{};
          const isLimited=ua.role==='limited';
          const lim=ua.limits||{};

          return(
            <Card key={u.id} style={{padding:0,overflow:'hidden'}}>
              {/* User header */}
              <div style={{padding:'14px 18px',background:T.bg}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:38,height:38,borderRadius:'50%',background:u.isPrimary?T.red:T.bg,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',color:u.isPrimary?'#fff':T.muted,fontWeight:700,fontSize:13,flexShrink:0}}>{initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600,color:T.text}}>{u.firstName} {u.lastName}{u.isPrimary&&<span style={{fontSize:11,color:T.muted,fontWeight:400,marginLeft:8}}>Primary Applicant</span>}</div>
                    <div style={{fontSize:12,color:T.muted,marginTop:1}}>{[u.email,u.phone].filter(Boolean).join(' · ')}</div>
                  </div>
                  {!u.fromApplication&&<button onClick={()=>removeUser(u.id)} style={{background:'none',border:'none',cursor:'pointer',color:T.light,fontSize:18,padding:'0 4px',lineHeight:1,flexShrink:0}}>×</button>}
                </div>
              </div>

              {/* Access config — always shown */}
              <div style={{borderTop:`1px solid ${T.borderLight}`,padding:'16px 18px'}}>
                <LBField label="Access Level" required>
                  <LBSelect value={ua.role||''} onChange={v=>setUserRole(u.id,v)} placeholder="Select access level…" options={ACCESS_ROLES.map(r=>({value:r.v,label:r.l}))} />
                </LBField>

                <div style={{marginBottom:18}}>
                  <label style={{display:'block',fontSize:13,fontWeight:500,color:T.text,marginBottom:8}}>Account Access</label>
                  <div style={{display:'flex',flexDirection:'column',gap:8}}>
                    {(MOCK_FD.accounts||[]).map(acct=>{
                      const selAccts=ua.accounts||allAcctIds;
                      const checked=selAccts.includes(acct.id);
                      return(
                        <div key={acct.id} style={{padding:'10px 14px',background:T.bg,borderRadius:8,border:`1px solid ${checked?T.successBorder:T.border}`}}>
                          <CBRow checked={checked} onChange={()=>toggleAccount(u.id,acct.id)} label={acct.type} sublabel={acct.number} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {isLimited&&(
                  <div style={{marginTop:4}}>
                    <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Customize Access</div>
                    {addlSvcs.length>0&&(
                      <div style={{marginBottom:16}}>
                        <div style={{fontSize:13,fontWeight:600,color:T.text,marginBottom:10}}>Additional Services</div>
                        <div style={{display:'flex',flexDirection:'column',gap:8}}>
                          {addlSvcs.map(as=>(
                            <div key={as.key} style={{padding:'12px 14px',background:T.bg,borderRadius:8,border:`1px solid ${lim[as.key]!==false?T.successBorder:T.border}`}}>
                              <CBRow checked={lim[as.key]!==false} onChange={()=>setLimit(u.id,as.key,lim[as.key]===false?true:false)} label={as.label} />
                              {as.hasLimit&&lim[as.key]!==false&&(
                                <div style={{marginTop:10,paddingLeft:29}}>
                                  <LBField label={as.limitLabel} hint="Leave blank for no limit">
                                    <LBInput value={lim[as.key+'Limit']||''} onChange={v=>setLimit(u.id,as.key+'Limit',v)} placeholder="e.g. 50,000" prefix="$" />
                                  </LBField>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:T.text,marginBottom:10}}>Default Services</div>
                      <div style={{display:'flex',flexDirection:'column',gap:8}}>
                        {defaultSvcs.map(ds=>(
                          <div key={ds.key} style={{padding:'10px 14px',background:T.bg,borderRadius:8,border:`1px solid ${lim[ds.key]!==false?T.successBorder:T.border}`}}>
                            <CBRow checked={lim[ds.key]!==false} onChange={()=>setLimit(u.id,ds.key,lim[ds.key]===false?true:false)} label={ds.label} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Btn variant="secondary" fullWidth onClick={()=>setShowAdd(true)}>+ Add Additional User</Btn>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add Online Banking User">
        <p style={{fontSize:13,color:T.muted,margin:'0 0 18px',lineHeight:1.6}}>Add a user who needs online banking access but was not included in the account application.</p>
        <Grid2><LBField label="First Name" required><LBInput value={nu.firstName} onChange={v=>setNu({...nu,firstName:v})} placeholder="First name" /></LBField><LBField label="Last Name" required><LBInput value={nu.lastName} onChange={v=>setNu({...nu,lastName:v})} placeholder="Last name" /></LBField></Grid2>
        <LBField label="Email Address" required><LBInput type="email" value={nu.email} onChange={v=>setNu({...nu,email:v})} placeholder="user@company.com" /></LBField>
        <LBField label="Phone Number" hint="Used to receive one-time verification codes"><LBInput value={nu.phone} onChange={v=>setNu({...nu,phone:v})} placeholder="(617) 555-0100" /></LBField>
        <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:6}}><Btn variant="secondary" onClick={()=>setShowAdd(false)}>Cancel</Btn><Btn onClick={addUser} disabled={!nu.firstName||!nu.lastName||!nu.email}>Add User</Btn></div>
      </Modal>
    </div>
  );
};

// ── ACH Agreement Authorization ───────────────────────────────────
const OLBStepACHAgreement = ({fd, olb, setOlb}) => {
  const [drag,setDrag]=useState(false);
  const files=olb.achBankStatements||[];
  const handleFiles=fs=>{
    const arr=Array.from(fs).map(f=>({name:f.name,size:f.size,id:Date.now()+Math.random()}));
    setOlb(o=>({...o,achBankStatements:[...(o.achBankStatements||[]),...arr]}));
  };
  const removeFile=id=>setOlb(o=>({...o,achBankStatements:(o.achBankStatements||[]).filter(f=>f.id!==id)}));
  const fmtSize=b=>b<1024*1024?`${(b/1024).toFixed(0)} KB`:`${(b/(1024*1024)).toFixed(1)} MB`;

  return(
    <div>
      <h2 style={{fontSize:22,fontWeight:800,color:T.text,margin:'0 0 6px',letterSpacing:'-0.03em'}}>ACH Agreement Authorization</h2>
      <p style={{fontSize:14,color:T.muted,margin:'0 0 24px',lineHeight:1.6}}>Because your anticipated monthly ACH collection volume exceeds $25,000, we require additional documentation before enabling ACH Origination.</p>

      <Card style={{padding:22,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>Business Details</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px 32px'}}>
          {[
            {l:'Business Name',v:fd.businessName},
            {l:'Primary Contact',v:`${fd.primaryFirstName} ${fd.primaryLastName}`},
            {l:'Email Address',v:fd.primaryPersonalEmail},
            {l:'Phone Number',v:(fd.primaryPhone||'').split('|')[1]||'—'},
          ].map(row=>(
            <div key={row.l}>
              <div style={{fontSize:11,fontWeight:600,color:T.muted,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:3}}>{row.l}</div>
              <div style={{fontSize:14,color:T.text,fontWeight:500}}>{row.v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{padding:22}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:6}}>Bank Statements</div>
        <p style={{fontSize:13,color:T.muted,margin:'0 0 16px',lineHeight:1.6}}>Upload your three most recent bank statements. Accepted formats: PDF, JPG, PNG.</p>
        <div
          onDragOver={e=>{e.preventDefault();setDrag(true);}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);handleFiles(e.dataTransfer.files);}}
          onClick={()=>document.getElementById('ach-upload').click()}
          style={{border:`2px dashed ${drag?T.red:T.border}`,borderRadius:10,padding:'32px 20px',textAlign:'center',background:drag?T.redBg:T.bg,cursor:'pointer'}}>
          <div style={{fontSize:32,marginBottom:8}}>📄</div>
          <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:4}}>Drag & drop files here</div>
          <div style={{fontSize:12,color:T.muted,marginBottom:14}}>or click to browse</div>
          <Btn variant="secondary" size="sm" onClick={e=>{e.stopPropagation();document.getElementById('ach-upload').click();}}>Choose Files</Btn>
          <input id="ach-upload" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" style={{display:'none'}} onChange={e=>handleFiles(e.target.files)} />
        </div>
        {files.length>0&&(
          <div style={{marginTop:14,display:'flex',flexDirection:'column',gap:8}}>
            {files.map(f=>(
              <div key={f.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:T.bg,borderRadius:8,border:`1px solid ${T.border}`}}>
                <span style={{fontSize:18}}>📄</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,color:T.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</div>
                  <div style={{fontSize:11,color:T.muted}}>{fmtSize(f.size)}</div>
                </div>
                <button onClick={()=>removeFile(f.id)} style={{background:'none',border:'none',cursor:'pointer',color:T.light,fontSize:18,lineHeight:1,padding:'0 4px'}}>×</button>
              </div>
            ))}
            <div style={{fontSize:12,color:T.muted,marginTop:2,fontWeight:500}}>{files.length} of 3 required statement{files.length!==1?'s':''} uploaded{files.length>=3?' ✓':''}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Step 3: Review & Confirm ──────────────────────────────────────
const OLBStep3 = ({fd, olb}) => {
  const [accepted,setAccepted]=useState({});
  const toggleAccept=key=>setAccepted(a=>({...a,[key]:!a[key]}));
  const svc=olb.services||{};
  const users=(olb.users||[]).filter(u=>u.hasAccess);
  const access=olb.userAccess||{};
  const roleLabel={admin:'Senior Admin / Full Access',limited:'Limited Access',view:'View Only',deposit:'Deposit Only',none:'No Access'};

  const enabledSvcs=[];
  if(svc.wires!==false){const parts=['Online Wire Transfers'];if(svc.wiresDualAuth)parts.push(`Dual auth (${svc.wiresApprovals||'1'} approval${(svc.wiresApprovals||1)>1?'s':''})`);if(svc.wiresIntlFreq)parts.push(`International: ${svc.wiresIntlFreq}`);enabledSvcs.push({label:parts[0],detail:parts.slice(1).join(' · ')});}
  if(svc.ach){const types=[svc.achPayments&&'ACH Payments',svc.achCollection&&'ACH Collection'].filter(Boolean).join(' & ')||'—';const parts=[types];if(svc.achPayroll)parts.push('Payroll');if(svc.achDualAuth)parts.push(`Dual auth (${svc.achApprovals||'1'} approval${(svc.achApprovals||1)>1?'s':''})`);enabledSvcs.push({label:'ACH Origination',detail:parts.join(' · ')});}
  if(svc.positivePay)enabledSvcs.push({label:'Positive Pay'});
  if(svc.remoteDeposit)enabledSvcs.push({label:'Remote Deposit Scanner'});
  if(svc.zelle)enabledSvcs.push({label:'Zelle for Small Business'});

  return(
    <div>
      <h2 style={{fontSize:22,fontWeight:800,color:T.text,margin:'0 0 6px',letterSpacing:'-0.03em'}}>Review & Confirm</h2>
      <p style={{fontSize:14,color:T.muted,margin:'0 0 24px',lineHeight:1.6}}>Please review your online banking setup before submitting.</p>
      <Card style={{padding:22,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Company Services</div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:8}}>Included by Default</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{['Account Viewing','Internal Transfer','Bill Payment','Mobile Deposit','Statement Viewing'].map(s=><span key={s} style={{fontSize:12,color:T.muted,background:T.bg,border:`1px solid ${T.border}`,padding:'3px 10px',borderRadius:99}}>{s}</span>)}</div>
        </div>
        {enabledSvcs.length>0&&(
          <div>
            <div style={{fontSize:12,fontWeight:600,color:T.text,marginBottom:8}}>Additional Services</div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {enabledSvcs.map((s,i)=>(<div key={i} style={{display:'flex',alignItems:'baseline',gap:8,padding:'8px 12px',background:T.bg,borderRadius:7}}><div style={{width:6,height:6,borderRadius:'50%',background:T.red,flexShrink:0,marginTop:4}} /><div><span style={{fontSize:13,fontWeight:500,color:T.text}}>{s.label}</span>{s.detail&&<span style={{fontSize:12,color:T.muted}}> · {s.detail}</span>}</div></div>))}
            </div>
          </div>
        )}
        {enabledSvcs.length===0&&<div style={{fontSize:13,color:T.muted}}>No additional services selected.</div>}
      </Card>
      <Card style={{padding:22,marginBottom:24}}>
        <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>Authorized Users ({users.length})</div>
        {users.length===0&&<div style={{fontSize:13,color:T.muted}}>No users configured.</div>}
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {users.map(u=>{
            const ua=access[u.id]||{};
            const initials=`${(u.firstName||'')[0]||''}${(u.lastName||'')[0]||''}`.toUpperCase();
            const lim=ua.limits||{};
            const isLimited=ua.role==='limited';
            const disabledSvcs=isLimited?[
              ...[{key:'wires',l:'Wires'},{key:'ach',l:'ACH'},{key:'positivePay',l:'Positive Pay'},{key:'remoteDeposit',l:'Remote Deposit'},{key:'zelle',l:'Zelle'}].filter(s=>lim[s.key]===false),
              ...[{key:'internalTransfer',l:'Internal Transfer'},{key:'billPayment',l:'Bill Payment'},{key:'mobileDeposit',l:'Mobile Deposit'},{key:'statementViewing',l:'Statement Viewing'}].filter(s=>lim[s.key]===false),
            ]:[];
            return(
              <div key={u.id} style={{padding:'12px 14px',background:T.bg,borderRadius:8,border:`1px solid ${T.border}`}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:u.isPrimary?T.red:T.bg,border:`1px solid ${T.border}`,display:'flex',alignItems:'center',justifyContent:'center',color:u.isPrimary?'#fff':T.muted,fontWeight:700,fontSize:11,flexShrink:0}}>{initials}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:T.text}}>{u.firstName} {u.lastName}</div><div style={{fontSize:11,color:T.muted}}>{u.email}</div></div>
                  <Badge variant={ua.role?'brand':'default'}>{roleLabel[ua.role]||'Not configured'}</Badge>
                </div>
                {isLimited&&disabledSvcs.length>0&&<div style={{marginTop:8,paddingLeft:40,fontSize:11,color:T.muted}}>Disabled: {disabledSvcs.map(s=>s.l).join(', ')}</div>}
              </div>
            );
          })}
        </div>
      </Card>
      {(()=>{
        const termsItems=[
          svc.wires!==false&&{key:'wires',label:'Wire Origination Agreement'},
          svc.ach&&{key:'ach',label:'ACH Origination Agreement'},
          svc.positivePay&&{key:'positivePay',label:'Positive Pay Agreement'},
          svc.remoteDeposit&&{key:'remoteDeposit',label:'Remote Deposit Capture Agreement'},
        ].filter(Boolean);
        if(!termsItems.length) return null;
        return(
          <Card style={{padding:22,marginTop:16}}>
            <div style={{fontSize:12,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:10}}>Service Terms & Conditions</div>
            <p style={{fontSize:13,color:T.muted,margin:'0 0 14px',lineHeight:1.6}}>Please review and accept the terms and conditions for each enabled service before submitting.</p>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {termsItems.map(t=>(
                <div key={t.key} style={{padding:'12px 14px',background:accepted[t.key]?T.redBg:T.bg,borderRadius:8,border:`1px solid ${accepted[t.key]?T.red:T.border}`}}>
                  <CBRow checked={!!accepted[t.key]} onChange={()=>toggleAccept(t.key)}
                    label={t.label}
                    sublabel="[Placeholder] I have read and agree to the terms and conditions of this agreement." />
                </div>
              ))}
            </div>
          </Card>
        );
      })()}
    </div>
  );
};

// ── Done Screen ───────────────────────────────────────────────────
const DoneScreen = ({fd}) => (
  <div style={{textAlign:'center',paddingTop:24,maxWidth:520,margin:'0 auto'}}>
    <div style={{width:72,height:72,borderRadius:'50%',background:T.successBg,border:`3px solid ${T.successBorder}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px'}}><svg width="32" height="26" viewBox="0 0 32 26" fill="none"><path d="M2 13l9 9L30 2" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
    <h2 style={{fontSize:26,fontWeight:800,color:T.text,margin:'0 0 12px',letterSpacing:'-0.04em'}}>Online Banking Setup Complete!</h2>
    <p style={{fontSize:15,color:T.muted,lineHeight:1.7,margin:'0 0 28px'}}>Your preferences have been saved. We will set up online banking within <strong style={{color:T.text}}>1 business day</strong> after account opening and will reach out if any additional information is needed.</p>
    <div style={{background:T.bg,borderRadius:10,padding:'14px 18px',textAlign:'left'}}><div style={{fontSize:13,color:T.muted}}>You'll receive a confirmation email at <strong style={{color:T.text}}>{fd.primaryPersonalEmail}</strong> when access is enabled.</div></div>
  </div>
);

// ── Main App ──────────────────────────────────────────────────────
export default function App() {
  const fd = MOCK_FD;
  const [olbStep, setOlbStep] = useState(0);
  const [done, setDone] = useState(false);

  const initUsers = () => [
    {id:'primary', firstName:fd.primaryFirstName, lastName:fd.primaryLastName, email:fd.primaryPersonalEmail, phone:(fd.primaryPhone||'').split('|')[1]||'', hasAccess:true, isPrimary:true, fromApplication:true},
    ...(fd.signers||[]).map(s=>({id:String(s.id), firstName:s.firstName, lastName:s.lastName, email:s.email||'', phone:s.phone||'', hasAccess:true, fromApplication:true})),
  ];

  const [olb, setOlb] = useState({
    services:{wires:undefined,wiresDualAuth:null,wiresApprovals:'',wiresIntlFreq:'',ach:false,achType:'',achCollectionAmount:'',achNotes:'',achDualAuth:null,achApprovals:'',positivePay:false,remoteDeposit:false,zelle:false},
    users: initUsers(),
    userAccess:{},
  });

  const showACHStep=!!(olb.services?.ach&&olb.services?.achCollection&&olb.services?.achCollectionAmount&&olb.services.achCollectionAmount!=='$0 – $25,000');
  const activeSteps=[
    {label:'Company Services',sub:'Configure your online services'},
    {label:'Authorized User Setup',sub:'Manage users and their access'},
    ...(showACHStep?[{label:'ACH Agreement Authorization',sub:'Review and authorize ACH terms'}]:[]),
    {label:'Review & Confirm',sub:'Summary and next steps'},
  ];
  const activeComponents=[
    <OLBStep1 olb={olb} setOlb={setOlb} />,
    <OLBStep2 olb={olb} setOlb={setOlb} />,
    ...(showACHStep?[<OLBStepACHAgreement fd={fd} olb={olb} setOlb={setOlb} />]:[]),
    <OLBStep3 fd={fd} olb={olb} />,
  ];
  const safeStep=Math.min(olbStep,activeSteps.length-1);
  const isLast=safeStep===activeSteps.length-1;
  const step0Valid=(()=>{const svc=olb.services||{};const chk=(on,k)=>!on||(svc[k+'Accounts']||[]).length>0;return chk(svc.wires!==false,'wires')&&chk(!!svc.ach,'ach')&&chk(!!svc.positivePay,'positivePay')&&chk(!!svc.remoteDeposit,'remoteDeposit');})();

  return(
    <div style={{display:'flex',height:'100vh',overflow:'hidden',background:T.bg,fontFamily:font}}>
      <style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html,body,#root{height:100%}body{font-family:'DM Sans',-apple-system,sans-serif;background:#F2F2F2;color:#222;-webkit-font-smoothing:antialiased}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#CCC;border-radius:3px}select option{color:#222}`}</style>

      {/* Sidebar */}
      <div style={{width:258,minWidth:258,background:'#fff',borderRight:`1px solid ${T.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'24px 20px 20px',borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:32,height:32,borderRadius:7,background:T.red,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{color:'#fff',fontWeight:800,fontSize:11}}>LB</span></div>
            <div><div style={{fontSize:13,fontWeight:700,color:T.text}}>Online Banking Setup</div><div style={{fontSize:11,color:T.muted,marginTop:1}}>{fd.businessName}</div></div>
          </div>
        </div>
        <div style={{padding:'20px 18px',flex:1}}>
          {activeSteps.map((s,i)=>{
            const status=done?'done':i<safeStep?'done':i===safeStep?'active':'pending';
            const isLastStep=i===activeSteps.length-1;
            return(
              <div key={i} style={{display:'flex',gap:12,marginBottom:isLastStep?0:6,alignItems:'flex-start'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
                  <div style={{width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,background:status==='pending'?T.bg:T.red,color:status==='pending'?T.muted:'#fff'}}>{status==='done'?'✓':i+1}</div>
                  {!isLastStep&&<div style={{width:1,height:28,background:status==='done'?T.red:T.border,marginTop:3}} />}
                </div>
                <div style={{paddingTop:3,paddingBottom:isLastStep?0:28}}>
                  <div style={{fontSize:13,fontWeight:status==='active'?600:500,color:status==='pending'?T.muted:T.text,lineHeight:1.3}}>{s.label}</div>
                  {s.sub&&status==='active'&&<div style={{fontSize:11,color:T.muted,marginTop:2}}>{s.sub}</div>}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:'14px 20px',borderTop:`1px solid ${T.border}`}}>
          <div style={{fontSize:10,color:T.muted,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600}}>Relationship Manager</div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:T.redBg,display:'flex',alignItems:'center',justifyContent:'center',color:T.red,fontWeight:700,fontSize:12}}>{fd.rmName.split(' ').map(w=>w[0]).join('')}</div>
            <div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{fd.rmName}</div><div style={{fontSize:11,color:T.muted}}>617-555-0182</div></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{flex:1,overflowY:'auto',padding:'36px 48px',boxSizing:'border-box'}}>
          <div style={{maxWidth:680,margin:'0 auto'}}>
            {done ? <DoneScreen fd={fd} /> : activeComponents[safeStep]}
          </div>
        </div>
        {!done&&(
          <div style={{background:'#fff',borderTop:`1px solid ${T.border}`,padding:'16px 48px',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
            {safeStep>0&&<Btn variant="ghost" onClick={()=>setOlbStep(s=>Math.max(0,s-1))}>← Back</Btn>}
            <div style={{marginLeft:'auto'}}>
              {isLast
                ? <Btn size="lg" onClick={()=>setDone(true)}>Submit</Btn>
                : <Btn size="lg" disabled={safeStep===0&&!step0Valid} onClick={()=>setOlbStep(s=>s+1)}>Continue</Btn>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}