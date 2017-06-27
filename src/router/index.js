import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Game from '@/components/Game'
import Music from '@/components/Music'
import Note from '@/components/Note'
import Remark from '@/components/Remark'
import Photo from '@/components/Photo'
import Article from '@/components/Article'
import Category from '@/components/Category'
import List from '@/components/List'
import SelectList from '@/components/SelectList'
import Articlecontent from '@/components/articlecontent'
import Leftlist from '@/components/left_list'
import photolist from '@/components/photo_list'
import photocontent from '@/components/photocontent'
import Test from '@/components/test'
import vuex from '@/components/vuex'

 Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/note',
      name: 'Note',
      component: Note
    },
    {
      path: '/remark',
      name: 'Remark',
      component: Remark
    },
    {
      path: '/photo',
      name: 'Photo',
      component: Photo
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/category',
      name: 'Category',
      component:Category
    },
    {
      path: '/list',
      name: 'List',
      component:List
    },
    {
      path: '/selectList',
      name: 'SelectList',
      component:SelectList
    },
    {
      path: '/articlecontent',
      name: 'Articlecontent',
      component:Articlecontent
    },
    {
      path: '/left_list',
      name: 'Leftlist',
      component:Leftlist
    },
    {
      path: '/photo_list',
      name: 'photolist',
      component:photolist
    },
    {
      path: '/photocontent',
      name: 'photocontent',
      component:photocontent
    },
    {
      path: '/test',
      name: 'Test',
      component:Test
    },

     {
      path: '/vuex',
      name: 'vuex',
      component:vuex
    },

     


  ]
})
