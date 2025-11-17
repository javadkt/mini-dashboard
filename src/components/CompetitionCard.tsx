import React from 'react';
import { Competition } from '../types/Competition';
import Button from './Button';
import './styles.css';

interface Props {
  competition: Competition;
  onJoin: (id: number) => void;
}

export const CompetitionCard: React.FC<Props> = ({ competition, onJoin }) => {
  const { id, name, entryFee, prizePool, participants, joined } = competition;
  return (
    <div className="card comp-card">
      <div className="card-title">{name}</div>
      <div className="meta">
        <span>Entry Fee: <b>${entryFee}</b></span>
        <span>Prize Pool: <b>${prizePool}</b></span>
        <span>Participants: <b>{participants}</b></span>
      </div>
      <div className="hr" />
      <div className="flex space-between" style={{ gap: 12 }}>
        <span className="badge">ID #{id}</span>
        <Button disabled={joined} onClick={() => onJoin(id)}>{joined ? 'Joined' : 'Join'}</Button>
      </div>
    </div>
  );
};

export default CompetitionCard;
