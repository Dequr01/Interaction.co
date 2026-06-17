import React from 'react';
import { Settings, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Divider } from '../atoms/Divider';

interface WhatsAppSettingsCardProps {
  isConnected: boolean;
  phoneNumber?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const WhatsAppSettingsCard: React.FC<WhatsAppSettingsCardProps> = ({
  isConnected,
  phoneNumber,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="p-6 rounded-3xl bg-surface/40 backdrop-blur-xl border border-surface-border shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-[#25D366]" />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold text-text-primary">WhatsApp Business API</h3>
          <p className="text-sm text-text-secondary mt-1">Connect your WhatsApp number to interact with customers.</p>
        </div>
      </div>

      <Divider className="my-6" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h4 className="font-medium text-text-primary mb-1">Connection Status</h4>
          {isConnected ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Connected to {phoneNumber}</span>
            </div>
          ) : (
            <p className="text-sm text-text-muted">Not connected</p>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isConnected ? (
            <>
              <Button variant="ghost" size="md" className="w-full md:w-auto">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="md" onClick={onDisconnect} className="w-full md:w-auto text-red-400 hover:text-red-300">
                Disconnect
              </Button>
            </>
          ) : (
            <Button variant="primary" size="md" onClick={onConnect} className="w-full md:w-auto">
              Connect Number
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
