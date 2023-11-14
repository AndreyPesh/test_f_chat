import React, { useEffect, useState } from 'react';
import { MakeGenerics, useMatch, useNavigate } from '@tanstack/react-location';
import { LoginLayout } from '../layouts/LoginLayout';
import { LoginForm } from '../components/LoginForm';
import { Rooms } from '../components/Rooms';
import { useRoomsQuery } from '../lib/room';
import { generateUnitId, getUnit, setUnit } from '../lib/unit';
import { Unit } from '../shared/chat.interface';

function Login() {
  const navigate = useNavigate();
  const {
    data: { unit, roomName },
  } = useMatch<LoginLocationGenerics>();

  const [joinRoomSelection, setJoinRoomSelection] = useState<string>('');

  const { data: rooms, isLoading: roomsLoading } = useRoomsQuery();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    //@ts-ignore
    const unitFormValue = e.target[0].value;
    //@ts-ignore
    const roomFormValue = e.target[1].value;
    const newUnit = {
      unitId: generateUnitId(unitFormValue),
      unitName: unitFormValue,
    };
    setUnit({ id: newUnit.unitId, name: newUnit.unitName });
    if (joinRoomSelection !== '') {
      sessionStorage.setItem('room', joinRoomSelection);
    } else {
      sessionStorage.setItem('room', roomFormValue);
    }
    navigate({ to: '/chat' });
  };

  useEffect(() => {
    if (unit?.unitId && roomName) {
      navigate({ to: '/chat', replace: true });
    }
  }, [unit, roomName, navigate]);

  return (
    <LoginLayout>
      <Rooms
        rooms={rooms ?? []}
        selectionHandler={setJoinRoomSelection}
        selectedRoom={joinRoomSelection}
        isLoading={roomsLoading}
      ></Rooms>
      <LoginForm
        defaultUnit={unit?.unitName}
        disableNewRoom={joinRoomSelection !== ''}
        login={login}
      ></LoginForm>
    </LoginLayout>
  );
}

export const loader = async () => {
  const unit = getUnit();
  return {
    unit: unit,
    roomName: sessionStorage.getItem('room'),
  };
};

type LoginLocationGenerics = MakeGenerics<{
  LoaderData: {
    unit: Pick<Unit, 'unitId' | 'unitName'>;
    roomName: string;
  };
}>;

export default Login;
