import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/users/infra/typeorm/repositories/ProfilesRepository';

import IAvatarsRepository from '@modules/users/repositories/IAvatarsRepository';
import AvatarsRepository from '@modules/users/infra/typeorm/repositories/AvatarsRepository';

import IStimulusRepository from '@modules/stimulus/repositories/IStimulusRepository';
import StimulusRepository from '@modules/stimulus/infra/typeorm/repositories/StimulusRepository';

import ISettingsRepository from '@modules/users/repositories/ISettingsRepository';
import SettingsRepository from '@modules/users/infra/typeorm/repositories/SettingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository,
);

container.registerSingleton<IAvatarsRepository>(
  'AvatarsRepository',
  AvatarsRepository,
);

container.registerSingleton<IStimulusRepository>(
  'StimulusRepository',
  StimulusRepository,
);

container.registerSingleton<ISettingsRepository>(
  'SettingsRepository',
  SettingsRepository,
);
