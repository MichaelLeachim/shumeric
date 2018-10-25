This project set up is a courtesy of  [Create React App](https://github.com/facebookincubator/create-react-app).

## The reasons behind this project

The point of this project is to set up/remember my old knowledge of JS/ES6/React/Redux/Redux+Saga/TypeScript
and lots of other JS ecosystem details that I have missed while working primarily with back end or ClojureScript 
ecosystem. 

## Status (Progress) log
### [2018-10-25] [23:35] 

* I really start to like TypeScript. Out of all the frontend mess, it does a decent 
  work of making it less insane
  
### [2018-10-25] [23:24] Now, I am getting better hang on this stuff

Today, I've:

* Implemented integration of modals within the Redux pattern (the same way I did with Reframe). 
* Did most of the "dumb" part of this tiny demo app. 
* Figured out(?) how to befriend Immutable and TypeScript.
* found a better way online to have less boilerplate within the actions.
  [see this](https://github.com/MichaelLeachim/shumeric/blob/668e7ba3d6eea714a9c3c63d267c7a47e275dfcf/src/hello/actions.ts)
* The TypeScript handle of null is better than it was in 2015
* Type inference is also cool and works. 
* This app now is an absolute mess now. I am going to refactor it after finishing basic functionality. 



### [2018-10-25] [01:28] Okay, experience of JS/TS after ClojureScript. TLDR: I don't like it

Okay, I am, basically, lost in how quirky dynamic and, arbitrary,  everything is. 

* Tutorials of `2018` are *out of date*, because `JS` ecosystem moves fast and breaks things. (I guess the infrastructure doesn't use semver. 
  Breaking changes are a norm here). I guess, I need to look not for the year, but for the month of the tutorial. 
  Everything that is older than three months should be considered obsolete. 
* The TS linter is strange:
  * It doesn't advise on naming
  * On the other hand, it **requires** the imports to be in alphabetic order.(Wait, what? why? )
* **Typing**. Lots and lots of typing. I have three(!) files for an app smaller than hello world, where I need to register, load, inject, wrap
  stuff. The simplest things are getting lost in bureaucracy. Why for God's sake there is a **string** type dispatcher and a separate 
  action registration file? Is this some form of desire to look like a quasi Elm? 
* There is *a package* for everything. Literally, everything. Merging two hash maps is a package. 
* There is still no good story for immutability (I had this problem in ~2015). 
  Basically, you have a `Map` and a `List` from `Immutable.js` with their particular implementation of access. 
  And then you go. You can't juxtapose them with functional library or with an interface declaration without tons of boilerplate and
  an additional egghead to decipher types. All is because of the lack of syntax consistency. 
* I am yet to discover the asynchronous story of Redux. Which is the  most tedious part even on Reagent/Reframe 
  side. I guess, the Redux-Saga  does smth. similar to the effect system of Reframe. 
* JSX (basically, a vendor made  macro) is ugly from any point of view. 
* No good story for Emacs. (Auto complete and jump to definition works only in TS). 
  The other editors might have it better, though. 
* The sheer popularity of this thing is crazy. A simple [project template](https://github.com/facebook/create-react-app) has sixty
  thousand of stars. That means, it dwarfs anything non-mainstream. So, on the good side, finding a job within this stack shouldn't 
  be hard. 
  
### [2018-10-25] [00:15] On issue of type safety and immutability

Apparently, the problem of combining `immutable.js` and type declarations
is still not solved. (I used to have it in 2015, almost four years ago )

Basically, type systems bind to the syntax of JS. Library cannot hook up 
to the  syntax, so it doesn't work. The only way to overcome it is to make
a facade over an immutable map.

Right now, after reading:

* https://coderwall.com/p/vxk_tg/using-immutable-js-in-typescript
* https://blog.mayflower.de/6630-typescript-redux-immutablejs.html
* https://stackoverflow.com/questions/52824312/how-to-use-immutablejs-map-with-typescript
* https://blog.mgechev.com/2018/01/18/react-typescript-redux-immutable/ (best one!)

#### I've thought about it more. And here is a compromise that it seems that I come up with

Use spread operator for `interface(struct?) cloning`, and use `Immutable.js` for updating 
collections. 

I should work/think on it a little bit more


### [2018-10-24] [22:18]

Even more boilerplate. 

I should write my own Redux. 

And if I do, I should base it on:
https://github.com/Day8/re-frame

### [2018-10-24] [22:06]

A lot of boilerplate if we compare it to `Reagent+ReFrame`.

Still not sure how to enable immutability within the state
(and whether  I need it?)

### [2018-10-24] [22:03] Visibility scoping and architecture thoughts

The idea is to avoid complex access/scope patterns. 

The components should either:
* Be *embedded*   into the app (and thus, have full access to actions/reducers/effects/state/views)
* Be *completely* separate     (have no access to actions/reducers/state). and communicate through some other means
* Be *stateless* and *context less* in the general sense, and thus, be reusable.
  E.g. not depend on app state for their internal work. (For example, some third party widgets do not depend on app state, but provide 
  nice building blocks for the app). 
  
    
The common way is to delimit them like this: Web Page > App > Widgets

Where web pages do not share their state, but widgets withing app share 
their state via *redux* architecture. 


### [2018-10-24] [22:00]
How to handle effects? 

Redux Saga looks similar to what I know of effect handling from 
ReFrame. 

### [2018-10-24] [21:57]

I haven't figured what is the best way to structure Redux app. 
Right now, I think, that it is the best to have a scope (state?)
per page. 


Now, [this commit](https://github.com/MichaelLeachim/shumeric/commit/28167e75b94706587add481e06973450d07eab4e)
should give a basic **working** template for TS+React+Redux. 
It lacks:

* Pagination support
* Effects handling


### [2018-10-24] [21:54]

[tip] Sometimes `npm start` compilation gets stuck
on a specific file. 

Change & save a different source file to 
unstuck it. 

### Setting up Emacs for the project [2018-10-24] [18:03]

After learning about different modes and integrations
I decided to go with TypeScript and Tide. 

Why? 

* They provide a decent `jump to`
* The auto completion and flycheck work

My current config for Emacs

```lisp

;; @@@@@@@@@@@@@@@@@@@@@@@@@ JS/TS @@@@@@@@@@@@@@@@@@@@@@@@@@


(defun setup-tide-mode ()
  (interactive)
  (tide-setup)
  
  (setq tide-format-options
        '(:indentSize 2 :tabSize 2))
  (flycheck-mode +1)
  (setq flycheck-check-syntax-automatically '(save mode-enabled))
  (setq company-tooltip-align-annotations t)
  (eldoc-mode +1)
  (tide-hl-identifier-mode +1)
  (company-mode +1))

(use-package tide
  :ensure t
  :after (typescript-mode company flycheck)
  :hook ((typescript-mode . setup-tide-mode)
         (typescript-mode . tide-hl-identifier-mode)
         (before-save . tide-format-before-save)))

(use-package web-mode
  :ensure t
  :init
  (progn
    (add-to-list 'auto-mode-alist '("\\.tsx\\'" . web-mode))
    (add-hook 'web-mode-hook
              (lambda ()
                (when (string-equal "tsx" (file-name-extension buffer-file-name))
                  (setup-tide-mode))))
    (flycheck-add-mode 'typescript-tslint 'web-mode)))

(use-package js2-mode
  :ensure t
  :init
  (progn
    (add-hook 'js2-mode-hook #'setup-tide-mode)
    (add-to-list 'auto-mode-alist '("\\.js\\'" . js2-mode))))

(use-package indium
  :ensure t
  :config
  (add-hook 'js-mode-hook #'indium-interaction-mode))

(use-package tern
  :ensure t
  :config
  (add-hook 'js-mode-hook (lambda () (tern-mode t))))

;; @@@@@@@@@@@@@@@@@@@@@@@@ TS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

```
