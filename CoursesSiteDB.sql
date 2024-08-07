PGDMP                       |           CoursesSite    16.2    16.2 b    r           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            s           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            t           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            u           1262    16398    CoursesSite    DATABASE     �   CREATE DATABASE "CoursesSite" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Polish_Poland.1250';
    DROP DATABASE "CoursesSite";
                postgres    false            �            1259    16556    cart    TABLE     [   CREATE TABLE public.cart (
    user_id integer NOT NULL,
    course_id integer NOT NULL
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16511 
   categories    TABLE     o   CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16510    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    227            v           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    226            �            1259    16441    course    TABLE     >  CREATE TABLE public.course (
    course_id integer NOT NULL,
    creator_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    img character varying(255) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying
);
    DROP TABLE public.course;
       public         heap    postgres    false            �            1259    16517    course_categories    TABLE     l   CREATE TABLE public.course_categories (
    course_id integer NOT NULL,
    category_id integer NOT NULL
);
 %   DROP TABLE public.course_categories;
       public         heap    postgres    false            �            1259    16704    course_category    TABLE     j   CREATE TABLE public.course_category (
    course_id integer NOT NULL,
    category_id integer NOT NULL
);
 #   DROP TABLE public.course_category;
       public         heap    postgres    false            �            1259    16440    course_course_id_seq    SEQUENCE     �   CREATE SEQUENCE public.course_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.course_course_id_seq;
       public          postgres    false    219            w           0    0    course_course_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.course_course_id_seq OWNED BY public.course.course_id;
          public          postgres    false    218            �            1259    16683    course_purchases    TABLE     Y  CREATE TABLE public.course_purchases (
    purchase_id integer NOT NULL,
    course_id integer NOT NULL,
    user_id integer NOT NULL,
    purchase_price numeric(10,2) NOT NULL,
    tax_amount numeric(10,2) NOT NULL,
    creator_revenue numeric(10,2) NOT NULL,
    purchase_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 $   DROP TABLE public.course_purchases;
       public         heap    postgres    false            �            1259    16682     course_purchases_purchase_id_seq    SEQUENCE     �   CREATE SEQUENCE public.course_purchases_purchase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.course_purchases_purchase_id_seq;
       public          postgres    false    233            x           0    0     course_purchases_purchase_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.course_purchases_purchase_id_seq OWNED BY public.course_purchases.purchase_id;
          public          postgres    false    232            �            1259    16666    creator_info    TABLE     �  CREATE TABLE public.creator_info (
    creator_id integer NOT NULL,
    user_id integer NOT NULL,
    bank_account character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    birthday date NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    postal_code character varying(20) NOT NULL,
    country character varying(255) NOT NULL,
    balance numeric(10,2) DEFAULT 0.00
);
     DROP TABLE public.creator_info;
       public         heap    postgres    false            �            1259    16665    creator_info_creator_id_seq    SEQUENCE     �   CREATE SEQUENCE public.creator_info_creator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.creator_info_creator_id_seq;
       public          postgres    false    231            y           0    0    creator_info_creator_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.creator_info_creator_id_seq OWNED BY public.creator_info.creator_id;
          public          postgres    false    230            �            1259    16454    having_courses    TABLE     �   CREATE TABLE public.having_courses (
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    bought_date date NOT NULL,
    finish_date date,
    bought_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public.having_courses;
       public         heap    postgres    false            �            1259    16482    lesson    TABLE     �   CREATE TABLE public.lesson (
    lesson_id integer NOT NULL,
    module_id integer NOT NULL,
    name character varying(255) NOT NULL,
    video_url character varying(255),
    text_description text
);
    DROP TABLE public.lesson;
       public         heap    postgres    false            �            1259    16481    lesson_lesson_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lesson_lesson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.lesson_lesson_id_seq;
       public          postgres    false    224            z           0    0    lesson_lesson_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.lesson_lesson_id_seq OWNED BY public.lesson.lesson_id;
          public          postgres    false    223            �            1259    16470    modules    TABLE     �   CREATE TABLE public.modules (
    module_id integer NOT NULL,
    course_id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.modules;
       public         heap    postgres    false            �            1259    16469    modules_module_id_seq    SEQUENCE     �   CREATE SEQUENCE public.modules_module_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.modules_module_id_seq;
       public          postgres    false    222            {           0    0    modules_module_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.modules_module_id_seq OWNED BY public.modules.module_id;
          public          postgres    false    221            �            1259    16420    sessions    TABLE     �   CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    16495    user_progress    TABLE     d   CREATE TABLE public.user_progress (
    user_id integer NOT NULL,
    lesson_id integer NOT NULL
);
 !   DROP TABLE public.user_progress;
       public         heap    postgres    false            �            1259    16408    users    TABLE       CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    user_type character varying(50) NOT NULL,
    is_active boolean DEFAULT true
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16407    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    216            |           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            �            1259    16720    withdrawals    TABLE     �   CREATE TABLE public.withdrawals (
    id integer NOT NULL,
    creator_id integer,
    amount numeric(10,2),
    withdraw_time timestamp without time zone DEFAULT now()
);
    DROP TABLE public.withdrawals;
       public         heap    postgres    false            �            1259    16719    withdrawals_id_seq    SEQUENCE     �   CREATE SEQUENCE public.withdrawals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.withdrawals_id_seq;
       public          postgres    false    236            }           0    0    withdrawals_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.withdrawals_id_seq OWNED BY public.withdrawals.id;
          public          postgres    false    235            �           2604    16514    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    16444    course course_id    DEFAULT     t   ALTER TABLE ONLY public.course ALTER COLUMN course_id SET DEFAULT nextval('public.course_course_id_seq'::regclass);
 ?   ALTER TABLE public.course ALTER COLUMN course_id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16686    course_purchases purchase_id    DEFAULT     �   ALTER TABLE ONLY public.course_purchases ALTER COLUMN purchase_id SET DEFAULT nextval('public.course_purchases_purchase_id_seq'::regclass);
 K   ALTER TABLE public.course_purchases ALTER COLUMN purchase_id DROP DEFAULT;
       public          postgres    false    232    233    233            �           2604    16669    creator_info creator_id    DEFAULT     �   ALTER TABLE ONLY public.creator_info ALTER COLUMN creator_id SET DEFAULT nextval('public.creator_info_creator_id_seq'::regclass);
 F   ALTER TABLE public.creator_info ALTER COLUMN creator_id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    16485    lesson lesson_id    DEFAULT     t   ALTER TABLE ONLY public.lesson ALTER COLUMN lesson_id SET DEFAULT nextval('public.lesson_lesson_id_seq'::regclass);
 ?   ALTER TABLE public.lesson ALTER COLUMN lesson_id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16473    modules module_id    DEFAULT     v   ALTER TABLE ONLY public.modules ALTER COLUMN module_id SET DEFAULT nextval('public.modules_module_id_seq'::regclass);
 @   ALTER TABLE public.modules ALTER COLUMN module_id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16411    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16723    withdrawals id    DEFAULT     p   ALTER TABLE ONLY public.withdrawals ALTER COLUMN id SET DEFAULT nextval('public.withdrawals_id_seq'::regclass);
 =   ALTER TABLE public.withdrawals ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236            h          0    16556    cart 
   TABLE DATA           2   COPY public.cart (user_id, course_id) FROM stdin;
    public          postgres    false    229   �y       f          0    16511 
   categories 
   TABLE DATA           7   COPY public.categories (category_id, name) FROM stdin;
    public          postgres    false    227   �y       ^          0    16441    course 
   TABLE DATA           _   COPY public.course (course_id, creator_id, title, description, price, img, status) FROM stdin;
    public          postgres    false    219   �z       g          0    16517    course_categories 
   TABLE DATA           C   COPY public.course_categories (course_id, category_id) FROM stdin;
    public          postgres    false    228   ^�       m          0    16704    course_category 
   TABLE DATA           A   COPY public.course_category (course_id, category_id) FROM stdin;
    public          postgres    false    234   ��       l          0    16683    course_purchases 
   TABLE DATA           �   COPY public.course_purchases (purchase_id, course_id, user_id, purchase_price, tax_amount, creator_revenue, purchase_date) FROM stdin;
    public          postgres    false    233   �       j          0    16666    creator_info 
   TABLE DATA           �   COPY public.creator_info (creator_id, user_id, bank_account, name, surname, birthday, address, city, postal_code, country, balance) FROM stdin;
    public          postgres    false    231   ��       _          0    16454    having_courses 
   TABLE DATA           c   COPY public.having_courses (user_id, course_id, bought_date, finish_date, bought_time) FROM stdin;
    public          postgres    false    220   A�       c          0    16482    lesson 
   TABLE DATA           Y   COPY public.lesson (lesson_id, module_id, name, video_url, text_description) FROM stdin;
    public          postgres    false    224   �       a          0    16470    modules 
   TABLE DATA           =   COPY public.modules (module_id, course_id, name) FROM stdin;
    public          postgres    false    222   ��       \          0    16420    sessions 
   TABLE DATA           5   COPY public.sessions (sid, sess, expire) FROM stdin;
    public          postgres    false    217   %�       d          0    16495    user_progress 
   TABLE DATA           ;   COPY public.user_progress (user_id, lesson_id) FROM stdin;
    public          postgres    false    225   ��       [          0    16408    users 
   TABLE DATA           Y   COPY public.users (user_id, email, username, password, user_type, is_active) FROM stdin;
    public          postgres    false    216   ��       o          0    16720    withdrawals 
   TABLE DATA           L   COPY public.withdrawals (id, creator_id, amount, withdraw_time) FROM stdin;
    public          postgres    false    236   �       ~           0    0    categories_category_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_category_id_seq', 16, true);
          public          postgres    false    226                       0    0    course_course_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.course_course_id_seq', 45, true);
          public          postgres    false    218            �           0    0     course_purchases_purchase_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.course_purchases_purchase_id_seq', 13, true);
          public          postgres    false    232            �           0    0    creator_info_creator_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.creator_info_creator_id_seq', 2, true);
          public          postgres    false    230            �           0    0    lesson_lesson_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.lesson_lesson_id_seq', 94, true);
          public          postgres    false    223            �           0    0    modules_module_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.modules_module_id_seq', 76, true);
          public          postgres    false    221            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 19, true);
          public          postgres    false    215            �           0    0    withdrawals_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.withdrawals_id_seq', 3, true);
          public          postgres    false    235            �           2606    16516    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    227            �           2606    16521 (   course_categories course_categories_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT course_categories_pkey PRIMARY KEY (course_id, category_id);
 R   ALTER TABLE ONLY public.course_categories DROP CONSTRAINT course_categories_pkey;
       public            postgres    false    228    228            �           2606    16708 $   course_category course_category_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.course_category
    ADD CONSTRAINT course_category_pkey PRIMARY KEY (course_id, category_id);
 N   ALTER TABLE ONLY public.course_category DROP CONSTRAINT course_category_pkey;
       public            postgres    false    234    234            �           2606    16448    course course_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (course_id);
 <   ALTER TABLE ONLY public.course DROP CONSTRAINT course_pkey;
       public            postgres    false    219            �           2606    16689 &   course_purchases course_purchases_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.course_purchases
    ADD CONSTRAINT course_purchases_pkey PRIMARY KEY (purchase_id);
 P   ALTER TABLE ONLY public.course_purchases DROP CONSTRAINT course_purchases_pkey;
       public            postgres    false    233            �           2606    16674    creator_info creator_info_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.creator_info
    ADD CONSTRAINT creator_info_pkey PRIMARY KEY (creator_id);
 H   ALTER TABLE ONLY public.creator_info DROP CONSTRAINT creator_info_pkey;
       public            postgres    false    231            �           2606    16676 %   creator_info creator_info_user_id_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.creator_info
    ADD CONSTRAINT creator_info_user_id_key UNIQUE (user_id);
 O   ALTER TABLE ONLY public.creator_info DROP CONSTRAINT creator_info_user_id_key;
       public            postgres    false    231            �           2606    16458 "   having_courses having_courses_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.having_courses
    ADD CONSTRAINT having_courses_pkey PRIMARY KEY (user_id, course_id);
 L   ALTER TABLE ONLY public.having_courses DROP CONSTRAINT having_courses_pkey;
       public            postgres    false    220    220            �           2606    16489    lesson lesson_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lesson_pkey PRIMARY KEY (lesson_id);
 <   ALTER TABLE ONLY public.lesson DROP CONSTRAINT lesson_pkey;
       public            postgres    false    224            �           2606    16475    modules modules_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (module_id);
 >   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_pkey;
       public            postgres    false    222            �           2606    16426    sessions session_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 ?   ALTER TABLE ONLY public.sessions DROP CONSTRAINT session_pkey;
       public            postgres    false    217            �           2606    16499     user_progress user_progress_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (user_id, lesson_id);
 J   ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_pkey;
       public            postgres    false    225    225            �           2606    16417    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    16415    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    16419    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            �           2606    16726    withdrawals withdrawals_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    236            �           1259    16427    IDX_sessions_expire    INDEX     L   CREATE INDEX "IDX_sessions_expire" ON public.sessions USING btree (expire);
 )   DROP INDEX public."IDX_sessions_expire";
       public            postgres    false    217            �           2606    16564    cart cart_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_course_id_fkey;
       public          postgres    false    4771    229    219            �           2606    16559    cart cart_user_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 @   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_user_id_fkey;
       public          postgres    false    229    216    4764            �           2606    16527 4   course_categories course_categories_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT course_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.course_categories DROP CONSTRAINT course_categories_category_id_fkey;
       public          postgres    false    4781    227    228            �           2606    16522 2   course_categories course_categories_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT course_categories_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.course_categories DROP CONSTRAINT course_categories_course_id_fkey;
       public          postgres    false    228    219    4771            �           2606    16714 0   course_category course_category_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_category
    ADD CONSTRAINT course_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
 Z   ALTER TABLE ONLY public.course_category DROP CONSTRAINT course_category_category_id_fkey;
       public          postgres    false    227    4781    234            �           2606    16709 .   course_category course_category_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_category
    ADD CONSTRAINT course_category_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);
 X   ALTER TABLE ONLY public.course_category DROP CONSTRAINT course_category_course_id_fkey;
       public          postgres    false    234    219    4771            �           2606    16732    course course_creator_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.creator_info(creator_id);
 G   ALTER TABLE ONLY public.course DROP CONSTRAINT course_creator_id_fkey;
       public          postgres    false    231    4785    219            �           2606    16690 0   course_purchases course_purchases_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_purchases
    ADD CONSTRAINT course_purchases_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);
 Z   ALTER TABLE ONLY public.course_purchases DROP CONSTRAINT course_purchases_course_id_fkey;
       public          postgres    false    4771    219    233            �           2606    16695 .   course_purchases course_purchases_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.course_purchases
    ADD CONSTRAINT course_purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 X   ALTER TABLE ONLY public.course_purchases DROP CONSTRAINT course_purchases_user_id_fkey;
       public          postgres    false    4764    216    233            �           2606    16677 &   creator_info creator_info_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.creator_info
    ADD CONSTRAINT creator_info_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 P   ALTER TABLE ONLY public.creator_info DROP CONSTRAINT creator_info_user_id_fkey;
       public          postgres    false    4764    231    216            �           2606    16464 ,   having_courses having_courses_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.having_courses
    ADD CONSTRAINT having_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);
 V   ALTER TABLE ONLY public.having_courses DROP CONSTRAINT having_courses_course_id_fkey;
       public          postgres    false    219    4771    220            �           2606    16459 *   having_courses having_courses_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.having_courses
    ADD CONSTRAINT having_courses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 T   ALTER TABLE ONLY public.having_courses DROP CONSTRAINT having_courses_user_id_fkey;
       public          postgres    false    220    216    4764            �           2606    16490    lesson lesson_module_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lesson_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(module_id);
 F   ALTER TABLE ONLY public.lesson DROP CONSTRAINT lesson_module_id_fkey;
       public          postgres    false    4775    222    224            �           2606    16476    modules modules_course_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);
 H   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_course_id_fkey;
       public          postgres    false    222    219    4771            �           2606    16505 *   user_progress user_progress_lesson_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lesson(lesson_id);
 T   ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_lesson_id_fkey;
       public          postgres    false    4777    224    225            �           2606    16500 (   user_progress user_progress_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.user_progress DROP CONSTRAINT user_progress_user_id_fkey;
       public          postgres    false    4764    225    216            �           2606    16737 '   withdrawals withdrawals_creator_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.creator_info(creator_id);
 Q   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_creator_id_fkey;
       public          postgres    false    4785    231    236            h      x������ � �      f   �   x�e��
�0E�3_�PL_�R-]��Bn�L��Ӥ���߫Aqw�r�p�&*xb㆞m�j�ZO}�m�	i"����'uc{��?E���~��Y�@A�"�4[Ÿ��T�-G'&o�1���5���M8H�"��Q$PzgüS(��,dx�(2ؙ�y�~D��ɆF�D�'�FK�      ^   �  x���Ks�8��ʧ�ӎǱ���ܸI�mR���Z�m�)Q%�8�O� �촳m.�-��	��t�'������k��MrǍ��Xs�J�GeS�hv��'Kk+���(��b#
��^����~���?껿���>�Yx���<��� �W9���J�װe	�$#tYT�P�d7�ȁYłyr���Or�Ͻ��8E_��|�!�L6v�J�2斳i& �<y\�l�ք�K.7� ~��A��K��r���(���K��"�;DBH#B�<Cʫ�]Kx��Gq�E�m�w&�F�xr�i��S)�5�XF,J��]B�,i��Ա�s̮w��O3-*�Fr�����8:`���ֈ���y+dB\��ߙ���(�@!5+!�ak\ζ["�C���[�}��׵��S˳�HUPZ���ͧ��T"��g��N�5~���y��5�%���˘�/\b�is�"�n�K�¿%M[�)���4��%ޕ���B�K��b���VtB�ZȜ�5U�\�U%EƭP�0�����"@b��(V��b9e�(������I���C��4��<��3y;a���f���^�B��|S�Bd'#,��-*nJ�ݶ��w�wt��$}��~���V��j��n���1U�e�
6^�̮=�ڋ2h\rvٻ�ayDb�]���J��?�9d�F��䵋0��������IX6�2�*9��vn`�\�Ô���L�bn�+/�d���v6�{Fɕ��,n�"���1��]�}3=K���1^NP����
���m���c���(��g������yE:����~K�L�0�A�����e߰�Ʈ����9E��V����ԧ]r�$f[��u���2�yr�9�"Q�D�ٜb1��l�#sD�>�2������)�+�����e)~���U{�EGT�I�7���m�I�s�;��-�ţ���%�uٟ�vDj���H�c���*G9���,�C��,
 [�a�I���+h�7�4_�Z����	�t�>-��ë�W�P����ҵ�A��A�OUcG�N����2�p"��VR<彖�œ�Nw�:ѣVR�Z�0@`�@p	�o�t���5�&1��O�Oe�(�$GS����;��`����k�>#��v�/��:�N��r��l���3��m	Q&�@�U��p��M�/.�b���&���s7�X����s�G�ԓ5�����v�3>*}-�:&$މ�O��Zs��B��k�j�{nV&��ʈO
��M�Z-h܏MhD��|�md^$!bu��Cl8��%����Ӟ�G*t�p�(p�hf��5�Xx>�E{tP�'�Q�L�%�G�m���H�ͫ%b┷S/8!��T4��vl�4�%�m����- �ͷ�ͫ�;��5h���E��o�D�i���G�TySh��U�Iei�εMS���!6�rj�}/%|}�#�vV�>�������s�-��(k3wS�3�����t�)"��;88�/W      g      x�3�4�2�4�2�4b�=... q�      m   U   x�-���0�0L�8�w��sW}�g$��΁����ɴOoқ弰��7$4a���eY�e��/��R'��?��E�Y��      l   �   x����C!D�XE���`-鿎��~��0̸Ov�JAUX�:�P�NE�q����a6e�^	�R��h=����;��(������c5��2Ȗ�~��H5'��N�uՓ��7s�6�G��:N����
�����2~���Ď󧳼��@OK�S��/j��m�zs)�x�[e      j   �   x�=�1
1D��)�@��?`6�^@����n�
���b�һy/5�ÃyÈX�%����6[��U�=���w���X~���X��K�7�m�,V}=��R˩�s�~��<]g�C�ؕ��	28"stƘ7�(�      _   �   x����� �3L�@~�!�!:A���A�P�jK�����	�������i���?�Cm�׎�C3$��\`��U�z��G�П��pKk[�����0��7�,t�} �����W9>4<]�D��m�}��=�%��ƒ���{�9� a��D      c   �
  x��Y�r�6���Q,QG��8q�f�n��Ifvr�����"Oo�D}������D'N���ݙdl������ p�g�V%��L~^����4�,�����+��������3����%&.�L����������x���T��	�*��n-�"�{0n���^4�x�.2�Ҵ�����J7:�H7B'2�N&k�>yHZ���[v/�~m�;/{-i��h����<�,�A�=($�و]Ik���^���֮4�O��g��έ��\:_t��0JC�,�1)h	7��W;�l_IQj�]vre�v��s�/o��g�(��}<���,u_*���D��!�*!�Cva)�x&j��AX��I�
G���leʝ�E����ߊ�^j%yj��
��?��^���&����ޕ���aǬ?F�T�Q��~��g>w"�;B�$����?��h�AčIA���-��o ������9'J%���r)�෻∢�y ��#@�E�Q?n+�#ɉ�"l��/X�ՒC�� :3���C6ndMo�]��Q�@:�+x�Un]��L-JQ�"��%n&��P��v�\����)��Iأ`��A�mI�+��ZhU���t�|-�Ԓ��A��ڢ��!��;i�Əy�Z�"3>� >�� ��T@p{O ���-.����NEn��%US�@��ۢgm��go���=I'5�D�'�%g%5��%R�\H��|��G߼���,f��P�Y��#�T<�H�Η�r�0��_J$}S�wֹ�5�	@�̪�$�4��ټ�g/�s�c��#,l Z�J:XD��hz}+�"p����
�[Kj��5�0B3A�!i��){�Uʦ@�$�
o+[;��"��h�A�АX�������j������.8VZ��SI`ϔ�3�FZ^Vm$���_�W�yroly@L"�9��0��H2�ȅҭAˎ.~���������
uS����"�E%��˯L)s�
�QhM����{Fĵ2q��4�)K	ɑ��K��`z����T\�f���ԣ��h�g)�t�D�_iAc�'/z����)��بT�.�ܚD��h�������[��������2�b����,�Y��W���rǵL��\��zŭ(�ԕ��c��=~[*�j0[\%YKר���(��zd��$����7�l�� ��BgxP9cY§
3;������Δ�AY蘠rA#�G����д��|'\d.���2*��rՁk�X7�&%�(x�)����"�q�uB��貄��Z�j�T��2�c��	��,#V��"-V*�� $$]�`��[|I����5D���5����
��p��WQ�\�ߩD�3R��0�{�ԪB��]����n�r+x���B��@x�{�旍Ң�S�W+O�E��Ĕhh
��;�y��M�����"����'B_IS$7،sǦ�+A��Hl�5��&U��1"xvT9��r�T��z��~������%'���L�*������?蹷��T��HM$��ş=~����1���T�	�o�D�F�Ff�ޕ�U��z�z�T�N_g�v�/��pg�Q���/\�CͭHW����DL�����5�72�uE�Ea4{�s! ��>�6���]Cp@��n�Bٮ6y�U	+5�u}	�J{n����
��2��ņ8���M�P|�щ.�e��/�5���i�u�f������V��b[ex�ϔ��*	R�r��E�
5U�%!�8��b-l%c_�T�L�%�݋��y��stu�s�1�B�0c������zuz �0�0� '�9�W��;pG%�Z~�2��a�f�.Y��Z��(����l�,�F�	���6I�3ݎϷj�xg�-�h������
'u�}�hԖ�T4���gv��5,�C�T^��Ҿ�����<݇��.��ј�@-<G�<�T�ъer��^4���pJJ�wb[W5��Px}M�h�Ƒ�;e�~����)�O�E��Td�N�+�5q*NA�K�0��2<c89�ω�g���N�����*Uw"ïY�1�E9��.7zm�c�C��U�-�Q�h8d8.�iU�8m�א�p�ӣ��qQ5N40Tǟn��µ�?�]�Ť��ލ��1�Է_����8�36�O��މ��܈�e���ٞn�<��sj�����]���A>Y+dH�t�J1 �j*��O՘�ω��Z(̃���۲D�0�՟�_�\�gt�����^�fG���Z��d�Fa��������^���K7&�ĉn �(WX�%�	F?�c!�FW7�ᾝ6Ӵf�Cx��w��ޭ��I�M�H����߮Á ����Z�/�:��c��(�L�><xV�$�V�q$���n5��8����ڑ���,�R-���`�b�d�>�����җ"����)��;��gNY�y��ghA.�Æ����G�>��f�ǈ��zL�
h�=��Z�Q}�D[�#hJ{���A��p��W���SaFsM>^�5韦Ll4<N�F#�<��=qM��ɐ�Ƨ�dt"�1M���O҄�NR�l4;Ό�
�3=cH���O�3`��'��:��kD�����'Ѧ#6��#�t�ƧH�鄍�lnr�4�T�)�"��369�gglr
��lr��0��)�,f��)p�lr
�|�EQ��v]�      a   �  x�}T�v� \s��/�1Bk��I��$Ǎڤ�n�Dl	\@Nԯ��z��ݮ����F��ޚ�-�2�zC�Zy��Q��^�{��Z6R{���&Pށ���H�^S�Y/�}0U� 1Ϋ��%"�"�,ˍV?Z� !�h����!Eh!���ZԝS����}R���)����{᷵�Z�Iz4ຖ�+�,Ap(�Қ��^�(���tcU,#�N���^��Z�Vm����U����JG���N�,`9R&GN5�fd~4����!8\�B��hU]��F�\��/�i�V
?Ү��~�=JQz�8�O�`�b$q�4��hL .'�兲��й(%lF�{�څ����(��ܮ�������V4������NW���ZҢs^68 '�8��Kೀ<�6�9�Ow�Y ���.:-��g�r�K��2�C&�cX~K0�N�,�>0|��4;���L�@�9r�C��Iҩ��q0��'����$}6!��s	'1�$�(!q�C�_LC	v�kԼЗ��^ZH���<S�tF������4"�H9a�x)�7��!�a2��m~-1J�&�.a��^c���R|(Pv�/�PeB�R�*Ok),>$9��QP���T��t*ЦIw�>�HB16Áو};�_.��      \   N  x���Mo�0���+���A)�rSP㜢�ejv�|S�
8��Y��5�O��å��cc�y�c
���h�E����I~�����]��bl���Ǵ�lk�6����L�f@P�H�� ᅬ�H�,��2�.X�У��偟��+�笨��~��=8��\6t�:a�/����Z��;�4&�i���Y���a��nfsZY��N7�H�DTetm��\���2���:�ڜYz!���y��F�شܤ�H���̞{Q��`m�tu��rYԐ��񨜙�����1	[{�j�[N'8^�����.ˢ*��!�r�"�q�G��]      d      x�34�4�24�4����� >�      [   K  x�U�K��0���;f�;�(
**�u7<��@��<��_edj�$��T}�N�<� %i�)�||�	�(O��`�z�a��[��L�Xo���m�e�}�Q�u�P�T��ㅉ�N�a���D����u$S~��|ڟ�C?���S~�@ �1����"�P��r挆������:���,�l,%�q��M�D���"$h0�p���)62�N������ײ#Ƽ J�Ͼ4+m��+TR��3M�G���^�����ZC����;���������|�o���"���e@:��%s��%!�y�a���?��.2=˼U}c��8�zd�5�E��hu�,�Hu-��ʹ<�l����f�o?G���5~���l=Ufw��`WFH��ӧ��pD��T�%��*�
�K+�$��������$�����OyYdō����d��jJz�)��tN�mf���]�����+�*�Đ3��z?��z������6kb����8"�6��c2{�o�HZ�I3/���p�o�7��O�;�ةŻ�v�|_"����е����v�Y�*�vա���X�l��c��?0��2ch      o   1   x�3�4�4�30�4202�50�5�P0��2��24ӳ44367����� ��&     