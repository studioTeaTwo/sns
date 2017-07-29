# -*- encoding: utf-8 -*-
# stub: material_design_lite-sass 1.3.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "material_design_lite-sass".freeze
  s.version = "1.3.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Dmitriy Tarasov".freeze]
  s.bindir = "exe".freeze
  s.date = "2017-05-10"
  s.description = "Google's Material Design Lite with Material Icons and Roboto for Sass powered applications".freeze
  s.email = ["info@rubysamurai.com".freeze]
  s.homepage = "https://github.com/rubysamurai/material_design_lite-sass".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
  s.rubygems_version = "2.5.2".freeze
  s.summary = "Google's Material Design Lite with Material Icons and Roboto for Sass powered applications".freeze

  s.installed_by_version = "2.5.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<autoprefixer-rails>.freeze, [">= 6.5"])
      s.add_runtime_dependency(%q<sass>.freeze, [">= 3.3"])
      s.add_development_dependency(%q<railties>.freeze, [">= 5.0"])
      s.add_development_dependency(%q<rspec>.freeze, [">= 3.5"])
      s.add_development_dependency(%q<sprockets-rails>.freeze, [">= 3.0"])
    else
      s.add_dependency(%q<autoprefixer-rails>.freeze, [">= 6.5"])
      s.add_dependency(%q<sass>.freeze, [">= 3.3"])
      s.add_dependency(%q<railties>.freeze, [">= 5.0"])
      s.add_dependency(%q<rspec>.freeze, [">= 3.5"])
      s.add_dependency(%q<sprockets-rails>.freeze, [">= 3.0"])
    end
  else
    s.add_dependency(%q<autoprefixer-rails>.freeze, [">= 6.5"])
    s.add_dependency(%q<sass>.freeze, [">= 3.3"])
    s.add_dependency(%q<railties>.freeze, [">= 5.0"])
    s.add_dependency(%q<rspec>.freeze, [">= 3.5"])
    s.add_dependency(%q<sprockets-rails>.freeze, [">= 3.0"])
  end
end
