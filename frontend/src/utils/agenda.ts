import fs from 'fs';
import path from 'path';
import { SessionType, Speaker, AgendaItem, AgendaData } from '../types/agenda';

function resolveAgendaPath(): string {
  const candidates = [
    path.join(process.cwd(), 'agenda.txt'),
    path.join(process.cwd(), '../backend/agenda.txt'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('agenda.txt not found. Expected frontend/agenda.txt or backend/agenda.txt.');
}

export function parseAgenda(): AgendaData {
  const agendaPath = resolveAgendaPath();
  const fileContent = fs.readFileSync(agendaPath, 'utf8');

  const yearMatch = fileContent.match(/ACCELALPHA-ORACLE-(\d+)/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

  const items: AgendaItem[] = [];
  const blocks = fileContent.split(/\[SESSION_\d+\]/).slice(1);

  for (const block of blocks) {
    const timeMatch = block.match(/Time:\s*(.+)/);
    const titleMatch = block.match(/Title:\s*(.+)/);
    const speakerMatch = block.match(/Speaker:\s*(.+)/);

    if (timeMatch && titleMatch) {
      const time = timeMatch[1].trim();
      const title = titleMatch[1].trim();
      let type: SessionType = 'keynote';
      
      const titleLower = title.toLowerCase();
      if (titleLower.includes('networking') || titleLower.includes('break') || titleLower.includes('lunch') || titleLower.includes('registration')) {
        type = 'networking';
      } else if (titleLower.includes('panel') || titleLower.includes('q&a')) {
        type = 'panel';
      }

      const speakers: Speaker[] = [];
      if (speakerMatch) {
        const speakerText = speakerMatch[1].trim();
        // Skip generic teams
        if (!speakerText.includes('Event Operations Team') && !speakerText.includes('Networking Team') && !speakerText.includes('Event Catering Group') && !speakerText.includes('Accelalpha Team')) {
          let sText = speakerText;
          if (sText.startsWith('Panel Discussion featuring')) {
            sText = sText.replace('Panel Discussion featuring', '').trim();
          }
          const speakerParts = sText.split('&').map(s => s.trim());
          for (const sp of speakerParts) {
            const roleMatch = sp.match(/(.+?)\((.+)\)/);
            if (roleMatch) {
              speakers.push({
                name: roleMatch[1].trim(),
                role: roleMatch[2].trim()
              });
            } else {
              speakers.push({
                name: sp,
                role: ''
              });
            }
          }
        }
      }

      items.push({
        time,
        title,
        type,
        speakers
      });
    }
  }

  return { year, items };
}
