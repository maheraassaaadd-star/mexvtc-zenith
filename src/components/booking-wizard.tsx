import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CarFront, CalendarDays, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/mexvtc-data";

const steps = [{name:"Votre trajet",icon:MapPin},{name:"Date & heure",icon:CalendarDays},{name:"Véhicule",icon:CarFront},{name:"Coordonnées",icon:UserRound},{name:"Confirmation",icon:Check}];
const fields: Record<number,{name:string;label:string;type?:string;placeholder?:string}[]> = {
  0:[{name:"depart",label:"Point de départ",placeholder:"Adresse, gare ou aéroport"},{name:"destination",label:"Destination",placeholder:"Votre destination"},{name:"passagers",label:"Nombre de passagers",type:"number"}],
  1:[{name:"date",label:"Date",type:"date"},{name:"heure",label:"Heure",type:"time"},{name:"vol",label:"Numéro de vol",placeholder:"Optionnel"},{name:"tgv",label:"Numéro de TGV",placeholder:"Optionnel"}],
  2:[],
  3:[{name:"nom",label:"Nom"},{name:"prenom",label:"Prénom"},{name:"telephone",label:"Téléphone",type:"tel"},{name:"email",label:"Email",type:"email"}],
};
export function BookingWizard({compact=false}:{compact?:boolean}){
 const [step,setStep]=useState(0); const [vehicle,setVehicle]=useState("Berline"); const [data,setData]=useState<Record<string,string>>({});
 const set=(name:string,value:string)=>setData(d=>({...d,[name]:value}));
 const submit=(e:FormEvent)=>{e.preventDefault(); const subject=encodeURIComponent("Demande de réservation MEXVTC"); const body=encodeURIComponent(Object.entries({...data,vehicle}).map(([k,v])=>`${k}: ${v}`).join("\n")); window.location.href=`${contact.emailHref}?subject=${subject}&body=${body}`};
 return <form onSubmit={submit} className={compact?"booking-panel":"booking-wizard"}>
  <div className="mb-7 grid grid-cols-5 gap-1" aria-label={`Étape ${step+1} sur 5`}>
   {steps.map((s,i)=><div key={s.name} className={`booking-step ${i<=step?"is-active":""}`}><span>{i<step?<Check/>:<s.icon/>}</span><small className="hidden sm:block">{s.name}</small></div>)}
  </div>
  <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">Étape {step+1} / 5</p><h2 className={compact?"font-display text-2xl":"font-display text-3xl"}>{steps[step]?.name}</h2></div>{!compact&&<span className="text-xs text-muted-foreground">Demande sans paiement</span>}</div>
  {step<=3&&step!==2&&<div className="grid gap-4 sm:grid-cols-2">{fields[step]?.map(f=><label key={f.name} className="form-field"><span>{f.label}</span><input name={f.name} type={f.type||"text"} value={data[f.name]||""} onChange={e=>set(f.name,e.target.value)} placeholder={f.placeholder} required={["depart","destination","date","heure","nom","prenom","telephone","email"].includes(f.name)}/></label>)}</div>}
  {step===2&&<div className="grid gap-3 sm:grid-cols-2">{[["Berline","Mercedes Classe E / S","Jusqu’à 4 passagers · 2 bagages"],["Van","Mercedes Classe V","7–8 passagers · jusqu’à 7 bagages"]].map(([name,model,cap])=><button type="button" key={name} onClick={()=>setVehicle(name)} className={`vehicle-choice ${vehicle===name?"is-active":""}`}><CarFront/><span><b>{name}</b><small>{model}<br/>{cap}</small></span><i>{vehicle===name?<Check/>:null}</i></button>)}</div>}
  {step===3&&<label className="form-field mt-4"><span>Message</span><textarea value={data.message||""} onChange={e=>set("message",e.target.value)} rows={3} placeholder="Bagages, siège enfant, informations utiles…"/></label>}
  {step===4&&<div className="border-y border-border py-6"><p className="mb-4 text-sm text-muted-foreground">Vérifiez votre demande avant de l’envoyer à MEXVTC.</p><dl className="grid gap-3 text-sm sm:grid-cols-2">{Object.entries({...data,vehicle}).filter(([,v])=>v).map(([k,v])=><div key={k}><dt className="capitalize text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}</dl></div>}
  <div className="mt-6 flex justify-between gap-3"><Button type="button" variant="outline" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}><ArrowLeft/>Retour</Button>{step<4?<Button type="button" onClick={()=>setStep(s=>Math.min(4,s+1))}>Continuer<ArrowRight/></Button>:<Button type="submit">Envoyer la demande<ArrowRight/></Button>}</div>
 </form>
}
