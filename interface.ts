export interface REQUEST {
    mc?: string;
    session_id?: string;
}
export interface RESPONSE {
    code: number;
    message?: string;
};

export interface ID_PASSWORD {
    id?: string;
    password?: string;
};

/**
 * 'user' table data except 'id, 'password'.
 */
export interface USER_FIELDS {
    name?: string;
    nickname?: string;
    email?: string;
    mobile?: string;
    landline?: string;
    gender?: string;
    birthday?: string;
    country?: string;
    province?: string;
    city?: string;
    address?: string;
    zipcode?: string;
    stamp_last_login?: number;
    stamp_registration?: number;
    session_id?: string;
}


/**
 * 'FORUM DATA' table
 */
interface FORUM_DATA_IDX {
    idx: number;
}

interface FORUM_CONFIG_IDX{
    idx_config: number;
}
export interface FORUM_DATA_FIELDS {
    idx_user: number;
    title: string;
    content: string;
}

/**
 * 'FORUM CONFIG' table
 */


interface FORUM_CONFIG_FIELDS {
    id: string;
    name: string;
    description: string;
    level_list: number;
    level_view: number;
    level_write: number;
    level_comment: number;
}

export interface USER_SESSION_ID_RESPONSE extends RESPONSE {
    data: {
        session_id: string;
    }
}



/**
 *
 * This is identical of 'user' table.
 */
export interface USER_DATA extends ID_PASSWORD, USER_FIELDS {

};

export interface USER_DATA_REQUEST_DATA extends REQUEST {}

export interface USER_DATA_RESPONSE extends RESPONSE, USER_FIELDS{}

export interface USER_META_REQUEST_DATA  extends REQUEST{}

export interface USER_META_RESPONSE_DATA extends RESPONSE{}



export type USER_DATA_RESPONSE_DATA = USER_DATA_RESPONSE;

export interface USER_LOGIN_REQUEST_DATA extends REQUEST, ID_PASSWORD { };
export type USER_LOGIN_REPONSE_DATA = USER_SESSION_ID_RESPONSE;

export interface USER_LOGOUT_REQUEST_DATA extends REQUEST { };


export interface USER_REGISTER_REQUEST_DATA extends REQUEST, USER_DATA {
    meta?: any;
};
export type USER_REGISTER_RESPONSE_DATA = USER_SESSION_ID_RESPONSE;

export interface USER_UPDATE_REQUEST_DATA extends REQUEST, USER_FIELDS {
    meta?: any;
};
export type USER_UPDATE_RESPONSE_DATA = USER_SESSION_ID_RESPONSE;

export interface ADMIN_USER_SEARCH_REQUEST_DATA extends REQUEST {
    cond: number;
    page: number;
    limit: number;
}

export interface ADMIN_USER_SEARCH_RESPONSE_DATA extends RESPONSE, USER_DATA {

}

////FORUM////
export interface FORUM_DATA_REQUEST_DATA extends REQUEST, FORUM_DATA_FIELDS, FORUM_CONFIG_IDX {};
export interface FORUM_DATA_RESPONSE_DATA extends RESPONSE, FORUM_DATA_FIELDS {};

export interface FORUM_DATA_UPDATE_REQUEST_DATA extends REQUEST, FORUM_DATA_FIELDS, FORUM_DATA_IDX {};
export interface FORUM_DATA_UPDATE_RESPONSE_DATA extends RESPONSE, FORUM_DATA_FIELDS {};

export interface FORUM_DATA_DELETE_REQUEST_DATA extends REQUEST, FORUM_DATA_IDX {};
export interface FORUM_DATA_DELETE_RESPONSE_DATA extends RESPONSE, FORUM_DATA_IDX {};

export interface FORUM_DATA_GETS_REQUEST_DATA extends REQUEST, FORUM_CONFIG_IDX {};
export interface FORUM_DATA_GETS_RESPONSE_DATA extends RESPONSE, FORUM_DATA_FIELDS {};

export interface FORUM_CONFIG_REQUEST_DATA extends REQUEST, FORUM_CONFIG_FIELDS {};
export interface FORUM_CONFIG_RESPONSE_DATA extends RESPONSE, FORUM_CONFIG_FIELDS {};

export interface FORUM_CONFIG_GET_REQUEST_DATA extends REQUEST, FORUM_CONFIG_IDX {};
export interface FORUM_CONFIG_GET_RESPONSE_DATA extends RESPONSE, FORUM_CONFIG_FIELDS {};