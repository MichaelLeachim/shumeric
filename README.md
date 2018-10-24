This project set up is a courtesy of  [Create React App](https://github.com/facebookincubator/create-react-app).

## The reasons behind this project

The point of this project is to set up/remember my old knowledge of JS/ES6/React/Redux/Redux+Saga/TypeScript
and lots of other JS ecosystem details that I might miss while working primarily with back end or ClojureScript 
ecosystem. 

## Status (Progress) log

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
  E.g. not depend on app state. (For example, some third party widgets do not depend on app state, but provide 
  nice building blocks for the app)
  
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
