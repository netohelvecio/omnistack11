import knex from 'knex';
import paginator from 'knex-paginator';

import configDatabase from '../../knexfile';

paginator(knex);

const connection = knex(configDatabase.development);

export default connection;
