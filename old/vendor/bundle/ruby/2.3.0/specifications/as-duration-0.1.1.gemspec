# -*- encoding: utf-8 -*-
# stub: as-duration 0.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "as-duration".freeze
  s.version = "0.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Janko Marohni\u{107}".freeze]
  s.date = "2016-06-24"
  s.description = "Extraction of ActiveSupport::Duration and the related core extensions.".freeze
  s.email = ["janko.marohnic@gmail.com".freeze]
  s.homepage = "https://github.com/janko-m/as-duration".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
  s.rubygems_version = "2.5.2".freeze
  s.summary = "Extraction of ActiveSupport::Duration and the related core extensions.".freeze

  s.installed_by_version = "2.5.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>.freeze, ["= 5.6.0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    else
      s.add_dependency(%q<minitest>.freeze, ["= 5.6.0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<minitest>.freeze, ["= 5.6.0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
  end
end
