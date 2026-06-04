"use client";

import { useState, useEffect } from "react";
import { Copy, Check, QrCode, AlertCircle } from "lucide-react";

interface PixGeneratorProps {
  amount: number;
}

function getCRC16(payload: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    crc ^= (code << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function generatePixPayload(key: string, amount: number, receiverName: string, receiverCity: string): string {
  const cleanKey = key.trim();
  
  // Normalize string for compatibility
  const normalize = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const cleanName = normalize(receiverName).substring(0, 25);
  const cleanCity = normalize(receiverCity).substring(0, 15);

  const payloadFormat = "000201";
  
  // Merchant Account Info (ID 26)
  const gui = "0014br.gov.bcb.pix";
  const keyPart = `01${cleanKey.length.toString().padStart(2, "0")}${cleanKey}`;
  const accountInfo = `${gui}${keyPart}`;
  const merchantAccount = `26${accountInfo.length.toString().padStart(2, "0")}${accountInfo}`;
  
  const merchantCategory = "52040000";
  const currency = "5303986"; // ISO 4217 - 986 for BRL
  
  // Amount (ID 54)
  let amountPart = "";
  if (amount > 0) {
    const amtStr = amount.toFixed(2);
    amountPart = `54${amtStr.length.toString().padStart(2, "0")}${amtStr}`;
  }
  
  const country = "5802BR";
  const merchantName = `59${cleanName.length.toString().padStart(2, "0")}${cleanName}`;
  const merchantCity = `60${cleanCity.length.toString().padStart(2, "0")}${cleanCity}`;
  const additionalData = "62070503***"; // Default non-specific TXID

  const payloadStr = `${payloadFormat}${merchantAccount}${merchantCategory}${currency}${amountPart}${country}${merchantName}${merchantCity}${additionalData}6304`;
  const crc = getCRC16(payloadStr);

  return `${payloadStr}${crc}`;
}

export default function PixGenerator({ amount }: PixGeneratorProps) {
  const [pixString, setPixString] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Environment variables with fallbacks
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || "beijaflor.massaranduba@gmail.com";
  const receiverName = process.env.NEXT_PUBLIC_PIX_RECEIVER_NAME || "ASSOC PROJETO BEIJA FLOR";
  const receiverCity = process.env.NEXT_PUBLIC_PIX_RECEIVER_CITY || "SALVADOR";

  useEffect(() => {
    if (!pixKey) {
      setError("Chave PIX não configurada. Por favor, utilize os dados bancários.");
      return;
    }

    try {
      const payload = generatePixPayload(pixKey, amount, receiverName, receiverCity);
      setPixString(payload);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao gerar payload do PIX.");
    }
  }, [amount, pixKey, receiverName, receiverCity]);

  const handleCopy = () => {
    if (!pixString) return;
    navigator.clipboard.writeText(pixString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    );
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    pixString
  )}`;

  return (
    <div className="flex flex-col items-center gap-6 p-6 border border-slate-200/80 rounded-2xl bg-slate-50/50 shadow-xs">
      
      {/* Visual Instruction */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full mb-1">
          <QrCode size={12} />
          <span>Pagamento por PIX</span>
        </span>
        <h4 className="font-display text-sm font-extrabold text-brand-navy">
          Escaneie o QR Code ou Copie o Código
        </h4>
        {amount > 0 && (
          <p className="text-xs text-brand-green font-bold mt-1">
            Valor definido: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount)}
          </p>
        )}
      </div>

      {/* QR Code Container */}
      <div className="relative bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm w-48 h-48 flex items-center justify-center overflow-hidden">
        {pixString ? (
          <img
            src={qrCodeUrl}
            alt="QR Code PIX para doação"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-6 h-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Copy and Paste Button */}
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={handleCopy}
          className={`w-full py-3 px-4.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
            copied
              ? "bg-brand-green text-white"
              : "bg-brand-navy hover:bg-brand-navy-hover text-white"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Código Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copiar PIX Copia e Cola</span>
            </>
          )}
        </button>
        <span className="text-[9px] text-slate-400 text-center font-bold uppercase tracking-wider">
          Abra o app do seu banco e escolha "Pagar via Pix / Copia e Cola"
        </span>
      </div>

    </div>
  );
}
