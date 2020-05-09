
use utf8;
use File::Slurp;


my $source;
my $names;

my @lines = read_file('greek-names.txt', binmode => ':utf8' );
my $r=0;
for my $l(@lines)	{

	#print $l,"\n";

	if ($r && $l=~/\w+/ && $l !~ /\[edit\]/i)	{
		chomp($l);

		my @cols = split(/\t/,$l);

		my $doc = {
			source=>$cols[0],
			type=>$cols[1],
			name_source=>$cols[2],
			name=>$cols[3],
			description=>$cols[4],
		};

		$source->{$r} = $doc;

		if ($doc->{'name_source'} =~ /(.*?)\s*\((\.*?)\)/)	{
			$doc->{'name1'} = $1;
			$doc->{'name2'} = $2;
			delete $doc->{'name_source'};
		}

		if ($doc->{'description'} =~ /(.*?)\s*\((.*?)\)(.*?)$/)	{
			$doc->{'descr1'} = $1;
			$doc->{'descr2'} = $2;
			$doc->{'descr3'} = $3;
			#delete $doc->{'description'};

			$doc->{'name_source'} = $doc->{'descr2'} if !$doc->{'name_source'};
			$doc->{'name'} = $doc->{'descr1'} if !$doc->{'name'};


		}elsif ($doc->{'description'} =~ /(.*?)\s*\((.*?)\)/)	{
			$doc->{'descr1'} = $1;
			$doc->{'descr2'} = $2;
			#delete $doc->{'description'};

			$doc->{'name_source'} = $doc->{'descr2'} if !$doc->{'name_source'};
			$doc->{'name'} = $doc->{'descr1'} if !$doc->{'name'};

		}elsif ($doc->{'description'} =~ /(.*?)\s*—\s*(.*?)/)	{
			$doc->{'descr1'} = $1;
			$doc->{'descr2'} = $2;
			#delete $doc->{'description'};

			#$doc->{'name_source'} = $doc->{'descr2'} if !$doc->{'name_source'};
			$doc->{'name'} = $doc->{'descr1'} if !$doc->{'name'};
		}


		$names->{$r} = {
			source			=> $doc->{'source'},
			type			=> $doc->{'type'},
			name_source			=> $doc->{'name_source'},
			name			=> $doc->{'name'},
			name1			=> $doc->{'name1'},
			name2			=> $doc->{'name2'},
			description			=> $doc->{'description'},
			descr1			=> $doc->{'descr1'},
			descr2			=> $doc->{'descr2'},
			descr3			=> $doc->{'descr3'},
		};


	}



	$r++;
}

my @rows;
my @cols;
for my $l((qw( name_source name source type  name1 name2 descr1 descr2 descr3 description )))	{
	push @cols, $l;
}
push @rows, join("\t", @cols);


foreach my $f(keys %$names)	{
	my @cols;
#	foreach my $k(keys %{$names->{$f}})	{
#		push @cols, $names->{$f}->{$k};
#	}
	for my $l((qw( name_source name source type  name1 name2 descr1 descr2 descr3 description )))	{
		push @cols, $names->{$f}->{$l};
	}

	push @rows, join("\t", @cols);
}



open my $fh, '>:encoding(UTF-8)', 'names.txt'
    or die "Couldn't create '$name': $!";

print $fh  join("\n",@rows);





__END__


#write_file("names.txt", join("\n",@rows));
write_file_utf8('names.txt', @cols);

sub write_file_utf8 {
    my $name = shift;
    open my $fh, '>:encoding(UTF-8)', $name
        or die "Couldn't create '$name': $!";
    local $/;
    print {$fh} $_ for @_;
};

