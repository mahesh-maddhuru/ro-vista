create table if not exists AS_SPECIFIC_ROA_RATIO
(
    ASN         int   not null,
    RECORD_DATE date  null,
    TOTAL       int   null,
    FILTER      int   null,
    REMOVE      int   null,
    RATIO       float null,
    ID          int auto_increment
        primary key
);

create index INDEX_ASN
    on AS_SPECIFIC_ROA_RATIO (ASN);

create table if not exists INFERENCE_RESULTS
(
    ASN         int          not null
        primary key,
    TARGET_ASN  int          null,
    FILTER      float        null,
    RECORD_DATE date         null,
    PREFIX      varchar(256) null
);

create table if not exists OVERVIEW_ROA_RATIO
(
    ASN          int          not null
        primary key,
    TOTAL        int          null,
    FILTER       int          null,
    REMOVE       int          null,
    AS_RANK      int          null,
    ORGANIZATION varchar(256) null,
    COUNTRY      varchar(256) null,
    COUNTRY_ISO  varchar(256) null,
    RATIO        float        null
);

create table if not exists test
(
    id   int          not null
        primary key,
    name varchar(256) null
);

